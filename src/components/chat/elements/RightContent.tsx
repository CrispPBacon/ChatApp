import { imagesType } from "../../../interfaces";
import { useEffect, useRef, useState } from "react";
import { useChat } from "../../../context/ChatContext";

interface RightContentProps {
  images: imagesType[];
  setImage: React.Dispatch<React.SetStateAction<imagesType | null>>;
  fetchImages: (chat_id: string) => void;
}

export default function RightContent({
  images,
  setImage,
  fetchImages,
}: RightContentProps) {
  const { chat } = useChat();
  const imageRefs = useRef<HTMLDivElement[]>([]);
  const [observer, setObserver] = useState<IntersectionObserver | null>(null);

  useEffect(() => {
    if (chat?._id) {
      fetchImages(chat._id);
    }
  }, [chat]);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5, // Trigger when 50% of the image is visible
    };

    const newObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const target = entry.target as HTMLDivElement;
          const imageSrc = target.getAttribute("data-src");
          if (imageSrc) {
            target.innerHTML = `<img src="${imageSrc}" alt="image" />`;
            newObserver.unobserve(target);
          }
        }
      });
    }, options);

    setObserver(newObserver);

    return () => {
      if (newObserver) {
        newObserver.disconnect();
      }
    };
  }, [images]);

  useEffect(() => {
    if (observer && imageRefs.current.length > 0) {
      imageRefs.current.forEach((imageRef) => {
        observer.observe(imageRef);
      });
    }
  }, [observer, images]);

  return (
    <div className="content">
      <div className="media">
        {images.length > 0
          ? images.map((image: imagesType, index: number) => (
              <div
                key={index}
                className="image-box"
                ref={(element) => {
                  if (element) {
                    imageRefs.current[index] = element;
                  }
                }}
                data-src={image.imageData}
                onClick={() => setImage(image)}
              />
            ))
          : null}
      </div>
    </div>
  );
}
