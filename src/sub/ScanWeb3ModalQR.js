import { useState } from "react";
import Button from "./Button.tsx";
import { wcGetPairings } from "./WalletConnect";

function ScanWeb3ModalQR({ onScan, onError, onCancel }) {
  let [manualURIValue, setManualURIValue] = useState("");

  let pairings = wcGetPairings();
  let hasPairings = Object.keys(pairings).length > 0;

  function evButtonDown(ev) {
    if (ev.keyCode === 13) {
      onScan(manualURIValue);
    }
  }

  return (
    <div className={"page-content"}>
      <div style={{ marginTop: "20px", marginBottom: "10px" }}>
        <p className={"label-text"}>Cole a url aqui:</p>
      </div>
      <input
        type="text"
        value={manualURIValue}
        className={"text-field"}
        onKeyDown={(ev) => evButtonDown(ev)}
        onChange={(ev) => setManualURIValue(ev.target.value)}
      />
      <div style={{ margin: "10px 0" }}>
        <Button
          type="button"
          onClick={() => onScan(manualURIValue)}
          fullWidth={true}
          className={"btn-pad"}
        >
          Pareamento manual
        </Button>
        {hasPairings && (
          <Button
            type="button"
            onClick={() => onCancel()}
            fullWidth={true}
            className={"btn-pad"}
          >
            Cancelar
          </Button>
        )}
      </div>
    </div>
  );
}

export default ScanWeb3ModalQR;
