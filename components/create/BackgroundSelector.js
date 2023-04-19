import Image from "next/image";
import React from "react";
import { useForm } from "../../hooks/useForm";

export default function BackgroundSelector({ orientation = "horizontal", imageCount = 27, ...props }) {
  const [formData, setFormData] = useForm();
  
  function getBackgroundImagePath(imageId) {
    return `${process.env.LIFF_URL}/images/background/${orientation}/background-${imageId}.png`;
  }

  return (
    <div className="row wrap" {...props}>
      {Array(imageCount)
        .fill(0)
        .map((_, j) => (
          <div
            style={{
              width: 17 * 2,
              height: 10 * 2,
              position: "relative",
            }}
            key={j}
          >
            <Image
              src={getBackgroundImagePath(j + 1)}
              loading="lazy"
              layout="fill"
              onClick={() =>
                setFormData({
                  ...formData,
                  backgroundUrl: getBackgroundImagePath(j + 1),
                  backgroundColor: "#00000000",
                })
              }
            />
          </div>
        ))}
    </div>
  );
}
