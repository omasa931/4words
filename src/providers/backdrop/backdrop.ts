import { Injectable } from "@angular/core";

@Injectable()
export class BackdropProvider {
  constructor() {}

  show(okng :string) {
    let backdrop = document.createElement("div");
    backdrop.id = "custom-backdrop";
    backdrop.className = "backdrop-fade-in";
    backdrop.style.position = "absolute";
    backdrop.style.top = "0";
    backdrop.style.right = "0";
    backdrop.style.left = "0";
    backdrop.style.bottom = "0";
    backdrop.style.width = "100%";
    backdrop.style.height = "100%";
    backdrop.style.background = "#000000";
    backdrop.style.opacity = "0.4";
    backdrop.style.display = "none";
    backdrop.style.pointerEvents = "none";

    if (okng == "OK") {
      backdrop.style.backgroundImage = "url('../../assets/imgs/maru.png')";
    } else {
      backdrop.style.backgroundImage = "url('../../assets/imgs/batsu.png')";
    }
    backdrop.style.backgroundPosition = "50% 20%"
    backdrop.style.backgroundRepeat = "no-repeat";
    

    let ionApp: any = document.getElementsByTagName("ion-app")[0];
    if (ionApp) {
      ionApp.appendChild(backdrop);
      backdrop.style.display = "block";
    }
  }

  hide() {
    let backdrop = document.getElementById("custom-backdrop");
    // 背景画像をクリア
    backdrop.style.backgroundImage = "";
    if (backdrop) {
      backdrop.classList.add("backdrop-fade-out");
      setTimeout(() => {
        backdrop.remove();
      }, 300);
    }
  }
}