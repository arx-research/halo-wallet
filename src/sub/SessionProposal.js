import { buildApprovedNamespaces } from "@walletconnect/utils";
import { execHaloCmdWeb } from "@arx-research/libhalo/api/web.js";
import { wcApproveSession, wcDenySession } from "./WalletConnect";
import { computeAddress } from "ethers/lib/utils";
import Button from "./Button.tsx";
import {
  EIP155_MAINNET_CHAINS,
  EIP155_TEST_CHAINS,
} from "../logic/EIP155Chains";

import arrowGreen from "../assets/icon-arrow-green.png";
import logo from "../assets/logo.svg";
import iconBook from "../assets/icon-livro-1.png";

function SessionProposal({
  proposal,
  haloAddress,
  onProposalProcessed,
  onProposalDenied,
}) {
  async function btnScanPublicKey() {
    let addr;

    if (!haloAddress) {
      let pkeys;

      try {
        pkeys = await execHaloCmdWeb({
          name: "get_pkeys",
        });
      } catch (e) {
        alert(e.toString());
        return;
      }

      addr = computeAddress("0x" + pkeys.publicKeys[1]);
    } else {
      addr = haloAddress;
    }

    const { id, params } = proposal;

    // ------- namespaces builder util ------------ //
    let chains = Object.keys(EIP155_MAINNET_CHAINS).concat(
      Object.keys(EIP155_TEST_CHAINS),
    );
    let accounts = chains.map((chain) => chain + ":" + addr);

    const approvedNamespaces = buildApprovedNamespaces({
      proposal: params,
      supportedNamespaces: {
        eip155: {
          chains: chains,
          methods: [
            "eth_sendTransaction",
            "eth_sign",
            "personal_sign",
            "eth_signTypedData",
            "eth_signTypedData_v3",
            "eth_signTypedData_v4",
          ],
          events: ["accountsChanged", "chainChanged"],
          accounts: accounts,
        },
      },
    });
    // ------- end namespaces builder util ------------ //

    await wcApproveSession({
      id,
      namespaces: approvedNamespaces,
    });

    onProposalProcessed(addr);
  }

  async function btnDenyRequest() {
    const { id, params } = proposal;

    await wcDenySession({ id, pairingTopic: params.pairingTopic });
    onProposalDenied();
  }

  return (
    <div  className={"page-content"}>
      <div className={"display-flex-icon"}>
        <img src={logo} alt="icon" style={{width: "45px"}} />
        <img src={arrowGreen} alt="icon" style={{width: "40px"}} />
        <img src={iconBook} alt="icon" style={{width: "60px"}} />
      </div>
      <p className={"label-text text-center"}>
        The following dApp wants to pair with this wallet:
      </p>
      <div className={"card-container"}>
        <p className={"label-text-white"}>
          dApp name: {proposal.params.proposer.metadata.name}
          <br />
          Description: {proposal.params.proposer.metadata.description}
          <br />
          dApp URL: {proposal.params.proposer.metadata.url}
        </p>
        <p className={"label-text"} style={{ marginTop: 20 }}>
          You will need to scan your HaLo after approving the request.
        </p>
        <div className={"button-container"}>
          <Button 
            className={"btn-pad"}
            onClick={() => btnScanPublicKey()}
          >
            Approve request
          </Button>
          <Button 
            className={"btn-pad btn-pad-red"}
            onClick={() => btnDenyRequest()}
          >
            Deny
          </Button>
        </div>
      </div>
    </div>
  );
}

export default SessionProposal;
