import React, { useState } from "react";

import { ReactComponent as CashIcon } from "assets/icons/cash.svg";
import { ReactComponent as RemoteIcon } from "assets/icons/remote.svg";
import { ReactComponent as LocationIcon } from "assets/icons/location.svg";
import { ReactComponent as BookmarkIcon } from "assets/icons/bookmark.svg";

import { formatSalary } from "helpers/currency";

import styles from "./styles.module.scss";

const JobLocation = ({ remote, country, city }) => {
  if (remote) {
    return (
      <span>
        <RemoteIcon /> Remote
      </span>
    );
  }
  return (
    <span>
      <LocationIcon />
      {city} ({country})
    </span>
  );
};
const JobSalary = ({ salary }) => {
  if (!salary) {
    return null;
  }
  return (
    <small className={styles.jobSalary}>
      <CashIcon />
      {formatSalary(salary)}
    </small>
  );
};

const JobPost = ({ job }) => {
  const [jobIsOpen, setJobIsOpen] = useState(false);
  const saveJobPost = job => {
    console.log(job);
  };
  return (
    <li onClick={() => setJobIsOpen(!jobIsOpen)} className={styles.jobPost}>
      <BookmarkIcon
        className={styles.bookmark}
        onClick={() => saveJobPost(job)}
      />
      <div className={styles.jobPreview}>
        <img src={job.logo_url} alt={`${job.company.name} logo`} />
        <div className={styles.jobDetails}>
          <div className={styles.jobHeading}>
            <h6>{job.title}</h6>
            <JobSalary salary={job.salary} />
          </div>
          <div className={styles.jobSubheading}>
            <p>{job.company.name}</p>
            <JobLocation
              remote={job.remote}
              country={job.country}
              city={job.city}
            />
          </div>
        </div>
      </div>
      {jobIsOpen && (
        <div
          className={styles.jobDescription}
          dangerouslySetInnerHTML={{ __html: job.description }}
        ></div>
      )}
    </li>
  );
};

export default JobPost;
