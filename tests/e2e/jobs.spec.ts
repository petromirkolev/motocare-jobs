// Core flow
// user can create job successfully
// created job is visible in list
// created job persists after refresh

// Validation
// create job with missing bike is rejected
// create job with missing service type is rejected
// create job with missing odometer is rejected
// create job with negative odometer is rejected

// Status flow
// requested → approved
// approved → in progress
// in progress → done
// requested → cancelled
// approved → cancelled

// Filtering
// all filter shows all jobs
// requested filter shows only requested jobs
// approved filter shows only approved jobs
// in progress filter shows only in progress jobs
// done filter shows only done jobs
// cancelled filter shows only cancelled jobs
// active filter button changes correctly

// Integrity
// deleting a bike removes related jobs from UI
