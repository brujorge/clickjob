import React, { useEffect, useState, useContext } from "react";
import axios from "axios";

import UserContext from "components/Context/UserContext";
import JobPost from "components/JobPost";
import styles from "./styles.module.scss";

const Favourites = () => {
  const [favouriteJobs, setFavouriteJobs] = useState([]);
  const user = useContext(UserContext);
  useEffect(() => {
    if (user) {
      axios
        .get(
          `https://clickjob-api.herokuapp.com/users/${user.id}/favourite_jobs/`
        )
        .then(response => {
          setFavouriteJobs(response.data.favourite_jobs);
        });
    }
  }, [user]);
  const handleSaveToFavourites = job => {
    axios
      .delete(
        `https://clickjob-api.herokuapp.com/users/${user.id}/favourite_jobs/${job.id}`
      )
      .then(response => {
        const deletedJob = response.data.favourite_job;
        setFavouriteJobs(jobs => jobs.filter(job => job.id !== deletedJob.id));
      });
  };

  return (
    <div className={styles.favouriteJobs}>
      <h2 className={styles.title}>
        {favouriteJobs.length} Favourite job
        {favouriteJobs.length === 1 ? "" : "s"}
      </h2>
      <ul className={styles.favouriteJobsList}>
        {favouriteJobs.map(job => (
          <JobPost
            job={{
              ...job,
              company: {
                name: job.company_name,
                about: job.company_description
              }
            }}
            isFavourite={true}
            saveToFavourites={handleSaveToFavourites}
          />
        ))}
      </ul>
    </div>
  );
};

export default Favourites;
