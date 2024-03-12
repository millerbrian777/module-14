function buildData(){
    d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then((data) => {
        console.log(data);

        let metadata= data.metadata;
        console.log(metadata);
        let samples = data.samples;
        console.log(samples);
        let names = data.names;
        console.log(names);

    })

}

function buildMetaData() {
    d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then((data) => {
        let metadata = data.metadata;
        let result = metadata.filter(sampleObj => sampleObj.id == sample)[0];

        let panel = d3.select("#sample-metadata")

        panel.append("h6").text(result.id);
        panel.html("")

        for (key in result){
            panel.append("h6").text(`${key}: ${result[key]}`);
        }
    })
}
function BuildCharts(sample){
    d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then((data) => {

        let samples = data.samples;
        let  result = samples.filter(sampleObj => sampleObj.id == sample)[0];
        let otu_ids = result.otu_ids;
        let otu_labels = result.otu_labels;
        let sample_values = result.sample_values;

        let yticks = otu_ids.slice(0,10).map(id => `OTU ${id}`).reverse()

        
        let bubbleLayout = {
            title: 'Bubble Chart'

        };
        
        let bubbleData = [
            {
                x: otu_ids,
                y: sample_values,
                text:otu_labels,
                mode: "markers",
                marker:sample_values,
                color: otu_ids
            }
        ];
        
        Plotly.newPlot("bubble", bubbleData, bubbleLayout);
        
        let barData =[
            {
                y: yticks,
                x: sample_values.slice(0,10).reverse(),
                text: otu_labels.splice(0,10).reverse(),
                type: "bar",
                orientation: "h"

        }
        ];

        let barLayout = {
            title: "Top Ten Bacteria",
            margin: {t:30, 1:150 }

        }

        Plotly.newPlot("bar",barData,barLayout )


});
}

function init(){
    let selector = d3.select("#selDataset");

    d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then((data) => {
        let sampleNames = data.names;

        for (i=0; i<sampleNames.length;i++){
            selector
            .append("option").text(sampleNames[i])
            .property("value",sampleNames[i]);

        }

        let firstSample = sampleNames[0];
        BuildCharts(firstSample);
        buildMetaData(firstSample);

        


    });
}

function opionChanged(newSample){
    BuildCharts(newSample);
    buildMetaData(newSample);
}

init();