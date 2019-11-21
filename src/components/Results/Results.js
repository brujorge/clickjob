import React, { useEffect, useState } from "react";
import axios from "axios";
import JobPost from "components/JobPost";

import styles from "./styles.module.scss";

const getFavouriteJobs = async (setFavouriteJobsId, userId) => {
  await axios
    .get(`https://clickjob-api.herokuapp.com/users/${userId}/favourite_jobs`)
    .then(response => {
      const jobsId = response.data.favourite_jobs.reduce((acc, job) => {
        return [...acc, job.job_id];
      }, []);
      setFavouriteJobsId(jobsId);
    });
};

const Results = ({ results, user }) => {
  const [favouriteJobsId, setFavouriteJobsId] = useState([]);
  useEffect(() => {
    getFavouriteJobs(setFavouriteJobsId, user.id);
  }, []);

  if (!results || results.jobs.length === 0) {
    return <h2>Search something...</h2>;
  }

  const saveToFavourites = (job, isFavourite) => {
    if (isFavourite) {
      return;
    }
    const {
      title,
      salary,
      description,
      functions,
      benefits,
      remote,
      city,
      country,
      seniority,
      logo_url,
      modality,
      company: { name: company_name, about: company_description },
      id: job_id
    } = job;
    axios
      .post(
        `https://clickjob-api.herokuapp.com/users/${user.id}/favourite_jobs`,
        {
          title,
          salary,
          description,
          functions,
          benefits,
          remote,
          city,
          country,
          seniority,
          logo_url,
          modality,
          job_id,
          company_name,
          company_description
        }
      )
      .then(response => {
        setFavouriteJobsId(jobsId => [
          ...jobsId,
          response.data.favourite_job.job_id
        ]);
      });
  };
  return (
    <section className={styles.results}>
      <ul className={styles.jobList}>
        {results.jobs.map(job => (
          <JobPost
            isFavourite={favouriteJobsId.includes(job.id)}
            saveToFavourites={saveToFavourites}
            key={job.id}
            job={job}
          />
        ))}
      </ul>
    </section>
  );
};

export default Results;
