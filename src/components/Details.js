import React, { useState, useEffect } from "react";

export default function Details(props) {
  const { url, dataId } = props;
  const [details, setDetails] = useState();
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${url}${dataId}.json`);
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        const data = await response.json();
        console.log(data);
        setDetails(data);
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [dataId, url]);

  return (
    <React.Fragment>
      {isLoading && <p className="loading">Loading...</p>}
      {details && (
        <div id={details.id} className="details">
          <img src={details.avatar} alt="картинка"/>
          <p className="name">{details.name}</p>
          <p>City: {details.details.city}</p>
          <p>Company: {details.details.company}</p>
          <p>Position: {details.details.position}</p>
        </div>
      )}
    </React.Fragment>
  );
}