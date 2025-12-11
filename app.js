// ================================
// WalletConnect Setup (CDN Version)
// ================================

// We must wait for DOM to load
document.addEventListener("DOMContentLoaded", async () => {

  const walletButton = document.getElementById("walletButton");
  const walletStatus = document.getElementById("walletStatus");

  // Load SWK from global CDN (window.StellarWalletsKit)
  const { StellarWalletsKit, WalletConnectModule, defaultModules } = window.StellarWalletsKit;

  // Initialize SWK
  const kit = new StellarWalletsKit({
    modules: [
      ...defaultModules(),
      new WalletConnectModule({
        projectId: "48b7bf0dacf7920c182f112b3cc388a8",
        metadata: {
          name: "PortalX LITE Test Project",
          description: "Test Project wallet connector",
          icons: ["https://legacygold.github.io/portalx-lite-test/assets/wallet-icon.png"],
          url: "https://legacygold.github.io/portalx-lite-wc-test/"
        }
      })
    ]
  });

  // CLICK → CONNECT WALLET
  walletButton.addEventListener("click", async () => {
    try {
      const { address } = await kit.openModal();
      console.log("CONNECTED:", address);

      walletStatus.textContent = shorten(address);
      walletStatus.classList.add("connected");

    } catch (err) {
      console.error("Wallet connection failed:", err);
      alert("Wallet connection cancelled or failed.");
    }
  });

});

// Utility for shortening addresses in UI
function shorten(addr) {
  return addr.slice(0, 5) + "…" + addr.slice(-4);
}
