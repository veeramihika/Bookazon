import { type } from '@testing-library/user-event/dist/type';
import axios from 'axios'
import React, { useEffect } from 'react'

export default function ({ id ,h,w}) {
    const [img, setimg] = React.useState();
    const loadimage = async (id) => {
        const res = await fetch(`http://localhost:8088/disp/${id}`);
                 const imageBlob = await res.blob();
                const imageObjectURL =URL.createObjectURL(imageBlob);
        setimg(imageObjectURL);
  }
  useEffect(() => {
    loadimage(id);
  },[])
  return (
    <div>
      <img  style={{ width:w,height:h }}src={img}  ></img>
    </div>
  )
}
