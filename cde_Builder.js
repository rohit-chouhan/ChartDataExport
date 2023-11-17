(function () {
   let template = document.createElement("template");
   template.innerHTML = `
       <div style="padding:10px;">
         <p>© rohchouhan@deloitte.com</p>
       </div>
        `;
   class ChartDataExportWidgetBuilderPanel extends HTMLElement {
      constructor() {
         super();
         this._shadowRoot = this.attachShadow({
            mode: "open"
         });
         this._shadowRoot.appendChild(template.content.cloneNode(true));
      }
      _submit(e) {
         e.preventDefault();
         this.dispatchEvent(
            new CustomEvent("propertiesChanged", {
               detail: {
                  properties: {},
               },
            })
         );
      }

   }
   customElements.define("com-rohit-sap-cde-builder",
      ChartDataExportWidgetBuilderPanel
   );
})();