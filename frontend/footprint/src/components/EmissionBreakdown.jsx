const data = [

{ name:"Transport", percent:45, color:"#43A047" },

{ name:"Electricity", percent:30, color:"#1976D2" },

{ name:"Food", percent:15, color:"#FB8C00" },

{ name:"Shopping", percent:10, color:"#8E24AA" }

];

const EmissionBreakdown = () => {

return(

<div className="breakdown-card">

<h2>Emission Breakdown</h2>

{
data.map((item,index)=>(

<div className="progress-item" key={index}>

<div className="progress-title">

<span>{item.name}</span>

<span>{item.percent}%</span>

</div>

<div className="progress">

<div

className="progress-fill"

style={{

width:`${item.percent}%`,

background:item.color

}}

>

</div>

</div>

</div>

))
}

</div>

);

};

export default EmissionBreakdown;