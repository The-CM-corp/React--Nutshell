// import React, { Component } from "react"



// export default class AnimalDetail extends Component {
//   render() {

//     const owner = this.props.owners.find(own => own.id === parseInt(this.props.match.params.ownerId)) || {}

//     return (
//       <section className="owner">
//         <div key={owner.id} className="card">
//           <div className="card-body">
//             <h4 className="card-title">
//               {owner.name}
//             </h4>
//             <h6 className="card-title">Contact info: {owner.phone}</h6>
//             <a href="#"
//               href="#" onClick={() => this.props.deleteOwner(owner.id)
//                 .then(() => this.props.history.push("/owners"))}
//               className="card-link">Delete</a>
//           </div>
//         </div>
//       </section>
//     )
//   }
// }