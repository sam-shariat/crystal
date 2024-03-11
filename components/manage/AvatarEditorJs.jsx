import React from 'react';
import AvatarEditor from 'react-avatar-editor';

// const props = {
//   image: '', // The image URL or data URI (required)
//   ref: null,
//   width: 0, // Width of editor canvas (required)
//   height: 0, // Height of editor canvas (required)

//   border: 0, // Border size (optional)
//   borderRadius: 0, // Border radius (optional)
//   color: [0, 0, 0, 0], // Border color as RGBA array (optional)

//   scale: 1, // Scale factor for image (optional)
//   rotate: 0, // Rotation degree (optional)

//   onLoadSuccess: () => {}, // Callback on load success (optional)
//   onLoadFailure: () => {}, // Callback on load failure (optional)

//   onImageReady: () => {}, // Callback when image is ready (optional) 
//   onMouseUp: () => {}, // Callback on mouse up (optional)
//   onMouseMove: () => {}, // Callback on mouse move (optional)

//   onImageChange: () => {}, // Callback on image change (optional)
//   onPositionChange: () => {}, // Callback on position change (optional)
// }

const AvatarEditorJs = (props,ref)=>{
    return <AvatarEditor ref={ref} {...props}/>
  }


  export default React.forwardRef(AvatarEditorJs);