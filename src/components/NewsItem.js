import React from 'react'

const NewsItem =(props)=> {
    let {title,description,imageurl,newsurl,author,date,source}=props;
    return (
      <div className='my-3'>
        <div className="card">
        <span className='badge bg-danger rounded-pill' style={{display:"flex",position:"absolute",right:"0"}}>{source}</span>
  <img src={imageurl?imageurl:""} className="card-img-top" alt="..."/>
  <div className="card-body">
    <h5 className="card-title">{title}</h5>
    <p className="card-text">{description}</p>
    <p className='card-text'><small className='text-muted'>By {author?author:"Sravan"} on {new Date(date).toGMTString()}</small></p>
    <a rel="noopener noreferrer" href={newsurl} target="_blank" className="btn btn-sm btn-dark">Read More</a>
  </div>
</div>
      </div>
    )
}

export default NewsItem