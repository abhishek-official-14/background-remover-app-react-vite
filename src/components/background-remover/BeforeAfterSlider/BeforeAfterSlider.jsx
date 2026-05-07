// import React, { useState } from "react";
// import { CompareSlider } from "react-compare-slider";
// import styles from "./BeforeAfterSlider.module.scss";

// const BeforeAfterSlider = ({ originalImage, processedImage }) => {
//   const [position, setPosition] = useState(50);

//   if (!originalImage || !processedImage) {
//     return null;
//   }

//   return (
//     <div className={styles.slider}>
//       <CompareSlider
//         itemOne={originalImage}
//         itemTwo={processedImage}
//         position={position}
//         onChange={setPosition}
//         className={styles.compareSlider}
//       />
//       <div className={styles.labels}>
//         <span className={styles.label}>Before</span>
//         <span className={styles.label}>After</span>
//       </div>
//     </div>
//   );
// };

// export default BeforeAfterSlider;









import React, { useState } from "react";

import {
  ReactCompareSlider,
  ReactCompareSliderImage,
} from "react-compare-slider";

import styles from "./BeforeAfterSlider.module.scss";

const BeforeAfterSlider = ({
  originalImage,
  processedImage,
}) => {
  const [position, setPosition] = useState(50);

  if (!originalImage || !processedImage) {
    return null;
  }

  return (
    <div className={styles.slider}>
      <ReactCompareSlider
        position={position}
        onPositionChange={setPosition}
        className={styles.compareSlider}
        itemOne={
          <ReactCompareSliderImage
            src={originalImage}
            alt="Before"
          />
        }
        itemTwo={
          <ReactCompareSliderImage
            src={processedImage}
            alt="After"
          />
        }
      />

      <div className={styles.labels}>
        <span className={styles.label}>
          Before
        </span>

        <span className={styles.label}>
          After
        </span>
      </div>
    </div>
  );
};

export default BeforeAfterSlider;

