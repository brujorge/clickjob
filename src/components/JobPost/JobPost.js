import React, { useState } from "react";
import classNames from "classnames";

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

const JobPost = ({ job, isFavourite = false, saveToFavourites }) => {
  const [jobIsOpen, setJobIsOpen] = useState(false);
  const jobPostClassNames = classNames({
    [styles.jobPost]: true,
    [styles.isFavourite]: isFavourite
  });
  const handleJobIsOpen = e => {
    e.stopPropagation();
    setJobIsOpen(!jobIsOpen);
  };
  return (
    <li className={jobPostClassNames}>
      <button
        className={styles.bookmark}
        onClick={() => saveToFavourites(job, isFavourite)}
      >
        <BookmarkIcon />
      </button>
      <div onClick={handleJobIsOpen} className={styles.jobPreview}>
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
        <div className={styles.jobDescription}>
          <section
            dangerouslySetInnerHTML={{ __html: job.description }}
          ></section>
          <h2>Functions</h2>
          <section
            className={styles.functions}
            dangerouslySetInnerHTML={{ __html: job.functions }}
          ></section>
          {job.benefits && (
            <>
              <h2>Benefits</h2>
              <section
                className={styles.benefits}
                dangerouslySetInnerHTML={{ __html: job.benefits }}
              ></section>
            </>
          )}
        </div>
      )}
    </li>
  );
};

export default JobPost;
