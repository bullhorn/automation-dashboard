# Testing framework reporters
Actual reporters to be added to the repo

# Jasmine reporter
Listens for jasmine events like `specDone`, `suiteDone`, and `jasmineDone`

Once the jasmineDone event is thrown, we issue a massUpsert call to our backend with all of the tests, allowing us to not rely on a scraper and instead hook right into our testing framework for more accurate results.
