import React from "react";

import JobPost from "./JobPost";

import styles from "./styles.module.scss";

const Results = ({ data }) => {
  if (!data || data.jobs.length === 0) {
    return <h2>Search something...</h2>;
  }
  return (
    <section className={styles.results}>
      <ul>
        {data.jobs.map(job => (
          <JobPost key={job.id} job={job} />
        ))}
      </ul>
    </section>
  );
};

export default Results;
