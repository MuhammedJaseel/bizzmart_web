import React, { useState, Component } from "react";
import "../style/inp.css";
import imgAdd from "../asset/image/add_img.png";
import imgReorder from "../asset/image/reorder_img.png";
import imgDelete from "../asset/image/delete_img.png";

import ReactCrop from "react-image-crop";
import("react-image-crop");

export function DropDown1({ ph, id, items, dv, setState, allStations }) {
  const [checked, setChecked] = useState(false);
  return (
    <select
      className="inpA"
      style={checked || ph === undefined ? { color: "black" } : {}}
      onChange={(e) => {
        setChecked(true);
        allStations.push(JSON.parse(e.target.value));
        setState({ allStations });
      }}
      defaultValue={dv}
    >
      {ph !== undefined ? (
        <option disabled selected hidden>
          {ph}
        </option>
      ) : null}
      {items != null
        ? items.map((item, k) => (
            <option key={k} value={JSON.stringify(item)}>
              {item.name}
            </option>
          ))
        : null}
    </select>
  );
}
export function DropDown2({ ph, id, items, onchange, name, value }) {
  const [checked, setChecked] = useState(false);
  return (
    <select
      className="inpB"
      id={id}
      style={checked || ph === undefined ? { color: "black" } : {}}
      onChange={(e) => {
        setChecked(true);
        if (typeof onchange !== undefined) onchange(e.target.value);
      }}
    >
      {ph !== undefined ? (
        <option disabled selected hidden>
          {ph}
        </option>
      ) : null}
      {items != null
        ? items.map((item, k) => (
            <option
              key={k}
              value={value === undefined ? JSON.stringify(item) : item[value]}
            >
              {name === undefined ? item.name : item[name]}
            </option>
          ))
        : null}
    </select>
  );
}

// export const ImageUploder1 = () => {
//   const [crop, setCrop] = useState();
//   return (
//     <React.StrictMode>
//       {/* <div>Cliker</div>
//       <div className="inpD">
//         <ReactCrop crop={crop} onChange={(c) => setCrop(c)}>
//           <img src="https://kalyanimotorsadmin.kalyanicrm.com/storage/images/22v5N49d55_0_1645273847.jpg" />
//         </ReactCrop>
//       </div> */}
//     </React.StrictMode>
//   );
// };

export class ImageUploder1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dragging: null,
      dragged: null,
      hoverd: null,
    };
  }
  render() {
    const { dragging, dragged, hoverd } = this.state;
    const allImages = this.props.state.allImages;
    return (
      <div className="inpC">
        <input
          onChange={(e) => {
            // for (let i = 0; i < e.target.files.length; i++) {
            //   const element = e.target.files[i];
            //   if (element) {
            //     const src = URL.createObjectURL(element);
            //     console.log(src);
            //     allImages.push(src);
            //   }
            // }
            // this.setState({ allImages });
            // e.target.value = "";
          }}
          type="file"
          id="pro_imgs"
          multiple
          className="inpCa"
        />
        <div className="inpCb">
          {allImages.length === 0 ? (
            <div className="inpCbA">
              <div />
              <div className="inpCbB">
                <div className="inpCbC">
                  <img alt="is" className="inpCbD" src={imgAdd} />
                  <div className="inpCbE">Drag images here to upload</div>
                </div>
                <div className="inpCbC">
                  <img alt="is" className="inpCbD" src={imgReorder} />
                  <div className="inpCbE">Drag and drop to reorder</div>
                </div>
                <div className="inpCbC">
                  <img alt="is" className="inpCbD" src={imgDelete} />
                  <div className="inpCbE">Drag outside to delete</div>
                </div>
              </div>
              <div className="inpCbF">
                <div className="inpCbG">DRAG</div>&nbsp;image here or&nbsp;
                <div className="inpCbH">BROWSE</div>&nbsp;to upload&nbsp;
              </div>
            </div>
          ) : (
            <div className="inpCbI">
              {allImages.map((img, k) => (
                <div
                  draggable
                  key={k}
                  onDragStart={() => this.setState({ dragging: img })}
                  onDragOver={(e) => {
                    e.preventDefault();
                    if (e.target.id === "pro_img") this.setState({ hoverd: k });
                    else this.setState({ hoverd: null });
                  }}
                  onDragEnd={(e) => {
                    if (hoverd === null)
                      allImages.splice(allImages.indexOf(dragging), 1);
                    else {
                      allImages[allImages.indexOf(dragging)] =
                        allImages[hoverd];
                      allImages[hoverd] = dragging;
                    }
                    this.setState({ allImages, hoverd: null });
                  }}
                >
                  <img
                    key={k}
                    src={img}
                    alt="product"
                    id="pro_img"
                    style={
                      hoverd === k
                        ? { border: "2px solid blue", width: 88, height: 96 }
                        : {}
                    }
                    className={k === 0 ? "inpCbJ_" : "inpCbJ"}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }
}