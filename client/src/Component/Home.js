import Blogs from './Blogs';
import { useEffect, useState } from 'react';
import React from 'react';


// const Home = () => {
//     const [data, setdata] = useState(null)
//     useEffect(() => { 
//         fetch("http://localhost:4000/blogs")
//           .then(res => {return res.json()})
//           .then(data => setdata(data))
//     }, [])                      
//     data && console.log(data[2])
//     return(
//         <div className='blogs'>
//             {data && <Blogs blogs={data}/>}
//         </div>
//     )
// }

const Home = () => {
    const [data, setData] = useState(null);

    useEffect(() => { 
        fetch("http://localhost:4000/blogs")
            .then(res => res.json())
            .then(data => setData(data))
            .catch(error => {
                console.error('Error fetching data:', error);
                // Handle errors (e.g., set an error state)
            });
    }, []);

    return (
        <div className='blogs'>
            {data && (
                <React.Fragment>
                    {/* Conditionally access and display specific data */}
                    {data[2] && (
                        <div>{/* Render data[2] here */}</div>
                    )}
                    {/* Pass all data to the Blogs component */}
                    <Blogs blogs={data} />
                </React.Fragment>
            )}
        </div>
    );
};

export default Home;