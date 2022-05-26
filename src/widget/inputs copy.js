import { useState, Component } from "react";
import "../style/inp.css";
import imgAdd from "../asset/image/add_img.png";
import imgReorder from "../asset/image/reorder_img.png";
import imgDelete from "../asset/image/delete_img.png";

export function DropDown1({ ph, id, items }) {
  const [checked, setChecked] = useState(false);
  return (
    <select
      className="inpA"
      style={checked ? { color: "black" } : {}}
      onChange={() => setChecked(true)}
    >
      <option disabled selected hidden>
        {ph}
      </option>

      {items != null
        ? items.map((item, k) => (
            <option key={k} value={item.id}>
              {item.name}
            </option>
          ))
        : null}
    </select>
  );
}
export function DropDown2({ ph, id, items }) {
  const [checked, setChecked] = useState(false);
  return (
    <select
      className="inpB"
      style={checked ? { color: "black" } : {}}
      onChange={() => setChecked(true)}
    >
      <option disabled selected hidden>
        {ph}
      </option>
      <option>jkjkj</option>
      <option>jkjkj</option>
    </select>
  );
}

export class ImageUploder1 extends Component {
  constructor() {
    super();
    this.state = {
      imgs: [],
      dragging: null,
      dragged: null,
      hoverd: null,
    };
  }
  render() {
    const { imgs, dragging, dragged, hoverd } = this.state;
    return (
      <div className="inpC">
        <input
          onChange={(e) => {
            for (let i = 0; i < e.target.files.length; i++) {
              const element = e.target.files[i];
              if (element) {
                const src = URL.createObjectURL(element);
                imgs.push(src);
              }
            }
            this.setState({ imgs });
            e.target.value = "";
          }}
          type="file"
          multiple
          className="inpCa"
        />
        <div className="inpCb">
          {imgs.length === 0 ? (
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
              {imgs.map((img, k) => (
                <div
                  draggable
                  key={k}
                  drag
                  onDragStart={() =>
                    this.setState({ dragging: img, dragged: null })
                  }
                  onDragLeave={(e) => {
                    const stop = imgs.indexOf(e.target.src);
                    if (stop !== -1) this.setState({ dragged: stop });
                    else this.setState({ dragged: null });
                    this.setState({hoverd: null});
                  }}
                  onDragEnd={(e) => {
                    if (dragged === null) imgs.splice(k, 1);
                    else {
                      imgs[k] = imgs[dragged];
                      imgs[dragged] = dragging;
                    }
                    this.setState({ imgs });
                  }}
                  onDragOver={() => this.setState({ hoverd: k })}
                >
                  <img
                    key={k}
                    src={img}
                    alt="product"
                    style={hoverd === k ? { border: "2px solid blue" } : {}}
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
