import { LightningElement } from "lwc";
import Leaflet from "@salesforce/resourceUrl/Leaflet";
import { loadStyle, loadScript } from "lightning/platformResourceLoader";
import getLocations from "@salesforce/apex/LeafletExample.getLocations";

export default class MapComponent extends LightningElement {
  map;
  markerGroup;
  height = "500px";

  renderedCallback() {
    this.initializeLeaflet();
  }

  initializeLeaflet() {
    Promise.all([
      loadStyle(this, Leaflet + "/leaflet.css"),
      loadScript(this, Leaflet + "/leaflet.js")
    ])
      .then(() => {
        const mapEl = this.template.querySelector(".map-root");
        mapEl.style = "height: " + this.height + ";";
        this.map = L.map(mapEl, { zoomControl: false }).setView(
          [11.206051, 122.447886],
          8
        ); // Default View

        L.tileLayer(
          "https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}",
          {
            attribution: "Justin Lyon @ Slalom"
          }
        ).addTo(this.map);

        var marker = L.marker([35.737448286487595, 51.39876293182373]).addTo(
          map
        );
        var popup = marker.bindPopup("<b>Hello world!</b><br />I am a popup.");
      })
      .catch((error) => {
        console.log("Error loading leaflet styles", error.message);
      });
  }
}
