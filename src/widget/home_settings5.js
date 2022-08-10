import React, { StrictMode } from "react";
import { submitKots } from "../method/home_settings";
import WidgetFooterSubmit from "./widget_footer";
import { AddingForm1, AddingFormLayout } from "./widget_form";

export function HomeSettingsProdectionStations({ state, setState }) {
  const title = `PRODUCTION STATION`;
  const desc = `Add your prodect station here`;
  const { page, allKot, addKot, deleteKot, loading, error } = state;
  if (page?.path === "prodectionStations")
    return (
      <StrictMode>
        <div className="hstN">
          <AddingFormLayout title={title} desc={desc}>
            <AddingForm1 title="All Stations">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setState({ addKot: e.target.stationName.value.split(",") });
                  e.target.reset();
                }}
              >
                <button className="hstNaA" type="submit" />
                <input
                  className="hstNaB"
                  id="stationName"
                  placeholder="Type station names separated by comma and add"
                />
              </form>
              <div className="hstNb">
                <div className="hstNbA">
                  <div className="hstNbAa">Station (Kitchen)</div>Station IP
                </div>
                {allKot.map((it, k) =>
                  deleteKot.filter((it1) => it1 === it.id).length > 0 ? null : (
                    <div className="hstNbB" key={k}>
                      <div className="hstNbBa">{it.title}</div>
                      <div className="hstNbBb">192.168.1.212</div>
                      <div
                        className="hstNbBc"
                        onClick={() => {
                          deleteKot.push(it.id);
                          setState({ deleteKot });
                        }}
                      />
                    </div>
                  )
                )}
                {addKot.map((it, k) => (
                  <div className="hstNbB" key={k}>
                    <div className="hstNbBa">{it}</div>
                    <div className="hstNbBb">...</div>
                    <div
                      className="hstNbBc"
                      onClick={() => {
                        addKot.splice(k, 1);
                        setState({ addKot });
                      }}
                    />
                  </div>
                ))}
              </div>
            </AddingForm1>
          </AddingFormLayout>
        </div>
        <WidgetFooterSubmit
          props={{
            onTap: () => submitKots(state, setState),
            onCancel: () => state.setPage(null),
            loading,
            error,
          }}
        />
      </StrictMode>
    );
}
