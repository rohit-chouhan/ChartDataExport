/*
* Developed by Rohit Chouhan
* https://linkedin.com/in/itsrohitchouhan
*/
(function () {
    let template = document.createElement("template");
    template.innerHTML = ``;
    class ChartDataExportWidget extends HTMLElement {
        constructor() {
            super();
            let shadowRoot = this.attachShadow({
                mode: "open"
            });
            shadowRoot.appendChild(template.content.cloneNode(true));
            this._props = {};
        }
        async connectedCallback() {
            this.initMain();
        }
        async initMain() {
            //start your code from here, happy coding :)
        }
        onCustomWidgetBeforeUpdate(changedProperties) {
            this._props = {
                ...this._props,
                ...changedProperties
            };
        }
        onCustomWidgetAfterUpdate(changedProperties) {
            this.initMain();
        }

        async setChart(title, chart) {
            const resultSet = await chart.getDataSource().getResultSet();
            //console.log(resultSet);
            // Get the keys of the first object in the array
            let keys = Object.keys(resultSet[0]);
            // Filter out keys starting with '@'
            let dimensions = keys.filter(key => !key.startsWith('@'));


            const uniqueMeasureDimensions = [];

            resultSet.forEach(item => {
                const measureDimensionId = item["@MeasureDimension"].id;

                if (!uniqueMeasureDimensions.includes(measureDimensionId)) {
                    uniqueMeasureDimensions.push(measureDimensionId);
                }
            });

            uniqueMeasureDimensions;

            const uniqueValues = {};

            resultSet.forEach(item => {
                Object.keys(item).forEach(key => {
                    const value = item[key].id;

                    if (!uniqueValues[key]) {
                        uniqueValues[key] = [value];
                    } else if (!uniqueValues[key].includes(value)) {
                        uniqueValues[key].push(value);
                    }
                });
            });


            var currentTimeInISO = new Date().toISOString();
            const fileName = title;
            // Create a JSON object with a title and results
            const jsonContent = {
                title: fileName,
                createdAt: currentTimeInISO,
                dimensions: dimensions,
                measures: uniqueMeasureDimensions,
                filters: uniqueValues,
                results: resultSet
            };

            // Convert the JSON object to a string
            const jsonString = JSON.stringify(jsonContent, null, 2);

            console.log(jsonString);
            // Create a Blob with the JSON string
            const blob = new Blob([jsonString], { type: "application/json" });

            // Create a download link
            const link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            link.download = fileName + ".json";

            // Append the link to the document
            document.body.appendChild(link);

            // Trigger a click on the link to start the download
            link.click();

            // Remove the link from the document
            document.body.removeChild(link);
        }
    }
    customElements.define("com-rohit-sap-cde", ChartDataExportWidget);
})();