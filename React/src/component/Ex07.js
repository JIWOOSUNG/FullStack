import React from 'react'


export default function ImageGallery() {
    const data = [
        {name: 'BTS', desc: '멋진 앨범', image:'images/bts.png'},
        {name: 'BlackPink', desc: '멋진 앨범', image:'images/blackpink.png'},
    ]
    //state 명 idols

    return (
        <div className="container mt-4">
          <div className="row">
            {data.map((idol, index) => (
              <div className="col-md-4 mb-4" key={index}>
                <div className="card">
                  <img
                    src={idol.image}
                    className="card-img-top"
                    alt={idol.name}
                    style={{ height: '200px', objectFit: 'cover' }}
                  />
                  <div className="card-body">
                    <h3 className="card-title">{idol.name}</h3>
                    <p className="card-text">{idol.desc}</p>
                    <button className='btn btn-info mx-4'>update</button>
                    <button className='btn btn-warning'>Remove</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }