import { test as base, expect } from './bikes';

type JobFixtures = {
  seededJob: {
    service: string;
    bike: string;
    odo: string;
  };

  bikeWithOneJob: {
    bike: {
      make: string;
      model: string;
      year: string;
    };
    job: {
      service: string;
      bike: string;
      odo: string;
    };
  };

  bikeWithTwoJobs: {
    bike: {
      make: string;
      model: string;
      year: string;
    };

    firstJob: {
      service: string;
      bike: string;
      odo: string;
    };
    secondJob: {
      service: string;
      bike: string;
      odo: string;
    };
  };
};

export const test = base.extend<JobFixtures>({
  seededJob: async ({ garageWithOneBike }, use) => {
    const seededJob = {
      service: 'Oil Change',
      bike: `${garageWithOneBike.make} ${garageWithOneBike.model}`,
      odo: '20000',
    };

    await use(seededJob);
  },

  bikeWithOneJob: async ({ garageWithOneBike, jobsPage, seededJob }, use) => {
    const bike = { ...garageWithOneBike };
    const job = seededJob;

    await jobsPage.gotoJobsPage();

    await jobsPage.addJob(job.service, job.bike, job.odo);
    await jobsPage.expectJobVisible(job.service);

    await use({ bike, job });
  },

  bikeWithTwoJobs: async ({ bikeWithOneJob, jobsPage }, use) => {
    const bike = bikeWithOneJob.bike;
    const chainJob = {
      service: 'Chain Service',
      bike: bikeWithOneJob.job.bike,
      odo: bikeWithOneJob.job.odo,
    };

    await jobsPage.addJob(chainJob.service, chainJob.bike, chainJob.odo);

    await jobsPage.expectJobVisible(chainJob.service);

    await jobsPage.page.evaluate(() => window.scrollTo(0, 0));

    await expect
      .poll(async () => {
        return await jobsPage.page.evaluate(() => window.scrollY);
      })
      .toBe(0);

    await use({
      bike,
      firstJob: bikeWithOneJob.job,
      secondJob: chainJob,
    });
  },
});

export { expect };
