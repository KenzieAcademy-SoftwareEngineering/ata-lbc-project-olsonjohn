const { useIsRestoring } = require("@tanstack/react-query");
const axios = require("axios");
const yargs = require("yargs");

const argv = yargs
  .option("customers", {
    alias: "c",
    describe: "Number of customers to create",
    demandOption: true,
    type: "number",
    default: 1,
  })
  .option("users", {
    alias: "u",
    describe: "Number of users to create",
    demandOption: true,
    type: "number",
    default: 1,
  })
  .help().argv;

let numOfUsers = argv.users;
let NumOfCustomers = argv.customers;

const names = [
  "Taylor",
  "Jordan",
  "Alex",
  "Riley",
  "Casey",
  "Avery",
  "Peyton",
  "Dakota",
  "Jamie",
  "Charlie",
  "Skyler",
  "Reese",
  "Alexis",
  "Cameron",
  "Morgan",
];

const lastNames = [
  "Smith",
  "Johnson",
  "Williams",
  "Jones",
  "Brown",
  "Davis",
  "Miller",
  "Wilson",
  "Moore",
  "Taylor",
  "Anderson",
  "Thomas",
  "Jackson",
  "White",
  "Harris",
  "Martin",
  "Thompson",
  "Garcia",
  "Martinez",
  "Robinson",
  "Clark",
  "Rodriguez",
  "Lewis",
  "Lee",
];

const userIdList = [];
const customerIds = [];
const ticketIdList = [];

function getRandomItemsFromArray(arr, percentage) {
  // Calculate the number of items to select (20% of array length)
  const numberOfItemsToSelect = Math.round(arr.length * percentage);

  // Create a copy of the original array to avoid modifying the original array
  const copyOfArray = [...arr];

  // Array to store randomly selected items
  const selectedItems = [];

  // Loop to randomly select items
  for (let i = 0; i < numberOfItemsToSelect; i++) {
    // Generate a random index within the remaining array
    const randomIndex = Math.floor(Math.random() * copyOfArray.length);

    // Add the randomly selected item to the selectedItems array
    selectedItems.push(copyOfArray.splice(randomIndex, 1)[0]);
  }

  return selectedItems;
}

// Function to generate a random name
function generateRandomName() {
  return `${names[Math.floor(Math.random() * names.length)]} ${
    lastNames[Math.floor(Math.random() * lastNames.length)]
  }`;
}

// Function to generate a random number between 101 and 1000
function generateRandomNumber() {
  return Math.floor(Math.random() * 900) + 101;
}

function generateRandomPhoneNumber() {
  let phoneNumber = "(";
  for (let i = 0; i < 3; i++) {
    phoneNumber += Math.floor(Math.random() * 10); // Appending random digits for area code
  }
  phoneNumber += ") ";

  for (let i = 0; i < 3; i++) {
    phoneNumber += Math.floor(Math.random() * 10); // Appending random digits for first three digits
  }

  phoneNumber += "-";

  for (let i = 0; i < 4; i++) {
    phoneNumber += Math.floor(Math.random() * 10); // Appending random digits for last four digits
  }

  return phoneNumber;
}

// Function to generate a random address
function generateRandomAddress() {
  const streetNumbers = Array.from({ length: 999 }, (_, i) => i + 1);
  const streetNames = [
    "Main",
    "Oak",
    "Elm",
    "Maple",
    "Cedar",
    "Pine",
    "Birch",
    "Spruce",
  ];
  const cities = [
    "New York",
    "Los Angeles",
    "Chicago",
    "Houston",
    "Phoenix",
    "Philadelphia",
    "San Antonio",
    "San Diego",
  ];

  const streetDesignatorList = ["St", "Rd", "Ave", "Blvd", "Way", "Pl", "Ln"];
  const states = ["CA", "TX", "FL", "NY", "IL", "PA", "OH", "GA"];
  const zip = Math.floor(Math.random() * 90000) + 10000;

  const streetNumber =
    streetNumbers[Math.floor(Math.random() * streetNumbers.length)];
  const streetName =
    streetNames[Math.floor(Math.random() * streetNames.length)];
  const city = cities[Math.floor(Math.random() * cities.length)];
  const state = states[Math.floor(Math.random() * states.length)];
  const streetDesignator =
    streetDesignatorList[
      Math.floor(Math.random() * streetDesignatorList.length)
    ];
  return `${streetNumber} ${streetName} ${streetDesignator}, ${city}, ${state} ${zip}`;
}

// Function to send POST requests
async function sendPostRequests() {
  const userUrl = "http://localhost:5001/user";
  const customerUrl = "http://localhost:5001/customer";

  // Sending 5 user POST requests
  for (let i = 0; i < numOfUsers; i++) {
    const randomName = generateRandomName();
    const randomNumber = generateRandomNumber();

    const userResponse = await axios.post(userUrl, {
      name: randomName,
      userNumber: randomNumber,
    });
    userIdList.push(userResponse.data.userId)
    console.log("User: " + userResponse.data.userId);
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Sleep for 1 second
  }

  // Sending 5 customer POST requests
  for (let i = 0; i < NumOfCustomers; i++) {
    const randomName = names[Math.floor(Math.random() * names.length)];
    const randomLastName =
      lastNames[Math.floor(Math.random() * lastNames.length)];
    const randomAddress = generateRandomAddress();
    const randomEmail = `${randomName
      .replace(/\s+/g, ".")
      .toLowerCase()}.${randomLastName.toLowerCase()}@example.com`;

    const randomPhoneNumber = generateRandomPhoneNumber();
    const customerResponse = await axios.post(customerUrl, {
      firstName: randomName,
      lastName: randomLastName,
      address: randomAddress,
      emailAddress: randomEmail,
      phoneNumber: randomPhoneNumber,
    });
    customerIds.push(customerResponse.data.id);

    console.log("Customer: " + customerResponse.data.id);
    //console.log(JSON.stringify(customerResponse.data, null, 2))
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Sleep for 1 second
  }
}

const sendTicketRequests = async () => {
  const ticketUrl = "http://localhost:5001/ticket";

  const tickets = [
    {
      subject: "Cannot Access Email",
      description:
        "User is unable to access email. Getting a login error. This issue has persisted for several days, and the user is unable to retrieve important emails necessary for their work.",
    },
    {
      subject: "Software Installation Issue",
      description:
        "User needs assistance with installing software on their computer. The user has attempted to install the software multiple times but encounters errors during the installation process. They require guidance to complete the installation successfully.",
    },
    {
      subject: "Network Connectivity Problem",
      description:
        "User is experiencing issues with network connection. Unable to connect to the internet. The user's device recognizes available networks but fails to establish a stable connection. The problem occurs across different Wi-Fi networks and persists after device restarts.",
    },
    {
      subject: "Printer Not Working",
      description:
        "User's printer is not working. Unable to print documents. The printer shows as connected, but when attempting to print, it fails to respond. The printer has enough paper and ink, and there are no visible paper jams. The issue persists across multiple printing attempts.",
    },
    {
      subject: "Password Reset Request",
      description:
        "User forgot their password and needs to reset it to regain access to the system. The user has attempted to reset the password using the provided options but did not receive the reset email. They need urgent assistance to regain access to their account and continue their work.",
    },
    {
      subject: "Software Crashing",
      description:
        "User reports that the software crashes when trying to open specific files. The software was working fine until a recent update. When attempting to open files, the software freezes and eventually crashes, resulting in data loss. The issue occurs consistently, making it difficult for the user to work on critical projects.",
    },
    {
      subject: "Account Locked Out",
      description:
        "User account is locked out and unable to log in. The user received a notification that their account has been locked due to multiple unsuccessful login attempts. The user is certain they are entering the correct credentials. They need immediate assistance to unlock their account and resume their activities.",
    },
    {
      subject: "Data Loss",
      description:
        "User experienced data loss and needs to recover the lost files. The user had important documents saved on their computer, but they are no longer accessible. The files seem to have disappeared without any action from the user. The lost data includes important reports and project files needed for a deadline.",
    },
    {
      subject: "Application Not Responding",
      description:
        "User complains that the application is not responding to any actions. The application launches successfully, but once open, it becomes unresponsive. Clicking on any feature or button yields no response. The user has attempted to restart the application and the computer, but the issue persists.",
    },
    {
      subject: "Emails Not Sending",
      description:
        "User is unable to send emails from their account. When attempting to send emails, they remain in the Outbox folder and are not delivered. The user can receive emails without any issues. They have checked the email recipients and attachments, but the emails still fail to send. Urgent assistance is needed to resolve this problem.",
    },
    {
      subject: "File Permission Issue",
      description:
        "User is unable to access certain files due to permission restrictions. The user is part of the appropriate user group and should have access to the files. However, attempting to open the files results in a 'Permission Denied' error. The user needs access to these files to complete their tasks.",
    },
    {
      subject: "Virus Detected",
      description:
        "User's computer is infected with a virus and needs immediate assistance. The user received multiple antivirus warnings indicating a virus infection. The computer is behaving erratically, and unwanted pop-ups appear frequently. The user is concerned about data theft and needs urgent help to remove the virus and secure their system.",
    },
    {
      subject: "Slow System Performance",
      description:
        "User reports slow performance on their computer and requests optimization. The computer experiences significant delays when opening applications, browsing the internet, and performing basic tasks. The slowdown affects work efficiency, and the user needs the system optimized to improve overall performance.",
    },
    {
      subject: "Hardware Malfunction",
      description:
        "User's hardware component (e.g., keyboard, mouse) is malfunctioning. The hardware component is unresponsive and does not register any input. The user has attempted to reconnect the hardware and restart the computer, but the issue remains. The malfunction disrupts work, and the user needs a replacement or repair.",
    },
    {
      subject: "Software Feature Request",
      description:
        "User suggests a new feature for the software application. The user proposes the addition of a specific feature that would enhance their workflow and improve productivity. The feature involves streamlining a process within the application, allowing users to complete tasks more efficiently. The user believes this addition would benefit all users of the software.",
    },
    {
      subject: "Account Login Issue",
      description:
        "User is unable to log in to their account. Getting an authentication error. The user attempts to log in using the correct credentials but receives an 'Authentication Failed' error message. They have verified their username and password, but access is denied. The user needs assistance to troubleshoot and regain access to their account.",
    },
    {
      subject: "Data Retrieval Problem",
      description:
        "User reports difficulty retrieving specific data from the system. Requests assistance. The user needs to access specific data stored in the system, but encounters errors when attempting to retrieve it. The data is critical for an ongoing project, and the user requests immediate assistance to retrieve the necessary information.",
    },
    {
      subject: "Mobile App Freezing",
      description:
        "User's mobile app becomes unresponsive and freezes during usage. The mobile app launches successfully, but during usage, it becomes unresponsive and freezes. The user is unable to navigate within the app or interact with any features. Restarting the app does not resolve the issue. The user experiences frequent app freezes, disrupting their mobile experience.",
    },
    {
      subject: "Error 404: Page Not Found",
      description:
        "User encounters a 'Page Not Found' error while navigating the website. The user attempts to access a specific page on the website but receives a '404 - Page Not Found' error. The link seems to be broken or the page has been removed. The user needs the page to complete a task and requests assistance in resolving the error.",
    },
    {
      subject: "File Corruption Problem",
      description:
        "User suspects file corruption in their documents. Files are not opening correctly. The user attempts to open several documents, but they appear corrupted and do not display the expected content. The user suspects file corruption and worries about data integrity. They need assistance in recovering or repairing the corrupted files.",
    },
    {
      subject: "Payment Gateway Issue",
      description:
        "User experiences problems processing payments through the online payment gateway. The user tries to make a payment through the online payment gateway, but the transaction fails repeatedly. The user ensures their payment method is valid and has sufficient funds. However, the payment does not go through, causing inconvenience. The user requests help in resolving the payment processing issue.",
    },
    {
      subject: "Application Hangs on Startup",
      description:
        "User faces delays as the application hangs indefinitely during startup. The application launches but hangs indefinitely during the startup process. The user experiences delays and frustration as they wait for the application to respond. Restarting the computer does not resolve the issue. The user needs prompt assistance to address the startup problem.",
    },
    {
      subject: "Email Delivery Delay",
      description:
        "User notices delays in email deliveries. Emails are taking longer than usual to arrive. The user sends and receives emails regularly, but recently, there has been a delay in email deliveries. Emails that used to arrive promptly are now taking much longer to reach the recipients. The user is concerned about communication delays and requests help to resolve the issue.",
    },
    {
      subject: "Missing Features in Software",
      description:
        "User identifies missing features in the software. Requests enhancements. The user identifies specific features that are missing in the software, which, if implemented, would enhance usability and productivity. The user suggests enhancements related to functionality, user interface, or integration with other tools. They believe these additions would greatly benefit users and requests their implementation.",
    },
    {
      subject: "Website Loading Slowly",
      description:
        "User observes slow loading times on the website. Pages take a long time to load. The user accesses the website regularly but has noticed a significant slowdown in page loading times. Navigating between pages and accessing content has become time-consuming due to the slow website performance. The user needs assistance in diagnosing and improving the website's loading speed.",
    },
    {
      subject: "Broken Hyperlinks",
      description:
        "User encounters broken hyperlinks on the website. Links lead to non-existing pages. The user clicks on hyperlinks within the website, but they lead to 'Page Not Found' errors. The links seem to be broken or misconfigured, directing users to non-existing pages. The user experiences frustration and inconvenience due to the broken hyperlinks and requests their correction.",
    },
    {
      subject: "Database Connection Error",
      description:
        "User receives an error message indicating a problem with the database connection. The user attempts to access specific data or features within the application but receives an error message indicating a database connection problem. The error prevents the user from retrieving or updating essential information. The user needs assistance in resolving the database connection error.",
    },
    {
      subject: "Mobile App Crashes on Launch",
      description:
        "User's mobile app crashes immediately upon launching. The user attempts to launch the mobile app, but it crashes immediately without any error messages. The app does not proceed past the startup screen and closes unexpectedly. The user has tried restarting the device, but the issue persists. The user requires help to resolve the app crashing problem.",
    },
    {
      subject: "Permission Denied",
      description:
        "User is denied access to certain files or features due to permission issues. The user attempts to access specific files or features within the application but receives a 'Permission Denied' error. Despite being an authorized user, the user cannot proceed due to permission restrictions. The user needs assistance in granting the necessary permissions to access the required files or features.",
    },
    {
      subject: "Browser Compatibility Problem",
      description:
        "User faces issues with website functionality in specific web browsers. The user accesses the website using different web browsers but encounters functionality issues in a particular browser. Certain features do not work as intended, leading to a suboptimal user experience. The user requests assistance in resolving the browser compatibility problem to ensure consistent functionality across all browsers.",
    },
    {
      subject: "Lost Password Recovery",
      description:
        "User cannot recover lost password through the password recovery process. The user attempts to recover a lost password using the provided recovery options but does not receive the expected recovery email. The recovery process seems to be ineffective, preventing the user from regaining access to their account. The user requires immediate assistance to recover the lost password.",
    },
    {
      subject: "Inaccurate Data Display",
      description:
        "User notices inaccuracies in the displayed data on the dashboard. The user accesses the application dashboard to view specific data sets but observes discrepancies and inaccuracies in the displayed information. The data points do not align with the user's expectations, raising concerns about data integrity. The user requests help in investigating and correcting the inaccuracies in the displayed data.",
    },
    {
      subject: "Mobile App Login Loop",
      description:
        "User is stuck in a loop while trying to log in to the mobile app. The user attempts to log in to the mobile app but enters a loop where the app continuously prompts for login credentials without progressing to the main interface. The user is unable to access any features within the app due to the persistent login loop. The user urgently needs assistance to resolve this issue and access the app's functionalities.",
    },
    {
      subject: "Account Login Issue",
      description:
        "User is unable to log in to their account. Getting an authentication error. The user attempts to log in using the correct credentials but receives an 'Authentication Failed' error message. They have verified their username and password, but access is denied. The user needs assistance to troubleshoot and regain access to their account.",
    },
    {
      subject: "Data Retrieval Problem",
      description:
        "User reports difficulty retrieving specific data from the system. Requests assistance. The user needs to access specific data stored in the system, but encounters errors when attempting to retrieve it. The data is critical for an ongoing project, and the user requests immediate assistance to retrieve the necessary information.",
    },
    {
      subject: "Mobile App Freezing",
      description:
        "User's mobile app becomes unresponsive and freezes during usage. The mobile app launches successfully, but during usage, it becomes unresponsive and freezes. The user is unable to navigate within the app or interact with any features. Restarting the app does not resolve the issue. The user experiences frequent app freezes, disrupting their mobile experience.",
    },
    {
      subject: "Error 404: Page Not Found",
      description:
        "User encounters a 'Page Not Found' error while navigating the website. The user attempts to access a specific page on the website but receives a '404 - Page Not Found' error. The link seems to be broken or the page has been removed. The user needs the page to complete a task and requests assistance in resolving the error.",
    },
    {
      subject: "File Corruption Problem",
      description:
        "User suspects file corruption in their documents. Files are not opening correctly. The user attempts to open several documents, but they appear corrupted and do not display the expected content. The user suspects file corruption and worries about data integrity. They need assistance in recovering or repairing the corrupted files.",
    },
    {
      subject: "Payment Gateway Issue",
      description:
        "User experiences problems processing payments through the online payment gateway. The user tries to make a payment through the online payment gateway, but the transaction fails repeatedly. The user ensures their payment method is valid and has sufficient funds. However, the payment does not go through, causing inconvenience. The user requests help in resolving the payment processing issue.",
    },
    {
      subject: "Application Hangs on Startup",
      description:
        "User faces delays as the application hangs indefinitely during startup. The application launches but hangs indefinitely during the startup process. The user experiences delays and frustration as they wait for the application to respond. Restarting the computer does not resolve the issue. The user needs prompt assistance to address the startup problem.",
    },
    {
      subject: "Email Delivery Delay",
      description:
        "User notices delays in email deliveries. Emails are taking longer than usual to arrive. The user sends and receives emails regularly, but recently, there has been a delay in email deliveries. Emails that used to arrive promptly are now taking much longer to reach the recipients. The user is concerned about communication delays and requests help to resolve the issue.",
    },
    {
      subject: "Missing Features in Software",
      description:
        "User identifies missing features in the software. Requests enhancements. The user identifies specific features that are missing in the software, which, if implemented, would enhance usability and productivity. The user suggests enhancements related to functionality, user interface, or integration with other tools. They believe these additions would greatly benefit users and requests their implementation.",
    },
    {
      subject: "Website Loading Slowly",
      description:
        "User observes slow loading times on the website. Pages take a long time to load. The user accesses the website regularly but has noticed a significant slowdown in page loading times. Navigating between pages and accessing content has become time-consuming due to the slow website performance. The user needs assistance in diagnosing and improving the website's loading speed.",
    },
    {
      subject: "Broken Hyperlinks",
      description:
        "User encounters broken hyperlinks on the website. Links lead to 'Page Not Found' errors. The user clicks on hyperlinks within the website, but they lead to 'Page Not Found' errors. The links seem to be broken or misconfigured, directing users to non-existing pages. The user experiences frustration and inconvenience due to the broken hyperlinks and requests their correction.",
    },
    {
      subject: "Database Connection Error",
      description:
        "User receives an error message indicating a problem with the database connection. The user attempts to access specific data or features within the application but receives an error message indicating a database connection problem. The error prevents the user from retrieving or updating essential information. The user needs assistance in resolving the database connection error.",
    },
    {
      subject: "Mobile App Crashes on Launch",
      description:
        "User's mobile app crashes immediately upon launching. The user attempts to launch the mobile app, but it crashes immediately without any error messages. The app does not proceed past the startup screen and closes unexpectedly. The user has tried restarting the device, but the issue persists. The user requires help to resolve the app crashing problem.",
    },
    {
      subject: "Permission Denied",
      description:
        "User is denied access to certain files or features due to permission issues. The user attempts to access specific files or features within the application but receives a 'Permission Denied' error. Despite being an authorized user, the user cannot proceed due to permission restrictions. The user needs assistance in granting the necessary permissions to access the required files or features.",
    },
    {
      subject: "Browser Compatibility Problem",
      description:
        "User faces issues with website functionality in specific web browsers. The user accesses the website using different web browsers but encounters functionality issues in a particular browser. Certain features do not work as intended, leading to a suboptimal user experience. The user requests assistance in resolving the browser compatibility problem to ensure consistent functionality across all browsers.",
    },
    {
      subject: "Lost Password Recovery",
      description:
        "User cannot recover lost password through the password recovery process. The user attempts to recover a lost password using the provided recovery options but does not receive the expected recovery email. The recovery process seems to be ineffective, preventing the user from regaining access to their account. The user requires immediate assistance to recover the lost password.",
    },
    {
      subject: "Inaccurate Data Display",
      description:
        "User notices inaccuracies in the displayed data on the dashboard. The user accesses the application dashboard to view specific data sets but observes discrepancies and inaccuracies in the displayed information. The data points do not align with the user's expectations, raising concerns about data integrity. The user requests help in investigating and correcting the inaccuracies in the displayed data.",
    },
    {
      subject: "Mobile App Login Loop",
      description:
        "User is stuck in a loop while trying to log in to the mobile app. The user attempts to log in to the mobile app but enters a loop where the app continuously prompts for login credentials without progressing to the main interface. The user is unable to access any features within the app due to the persistent login loop. The user urgently needs assistance to resolve this issue and access the app's functionalities.",
    },
    {
      subject: "Software Crashes During Printing",
      description:
        "User experiences software crashes when attempting to print documents. The user initiates the printing process within the software, but the application crashes unexpectedly. The crash occurs consistently during printing attempts, disrupting document processing tasks. The user requires immediate assistance to resolve the software crashing issue during printing.",
    },
    {
      subject: "Website Forms Not Submitting",
      description:
        "User encounters issues with submitting forms on the website. The user fills out online forms on the website but encounters problems when attempting to submit them. After completing the form fields, clicking the submit button does not trigger any response. The user's form submissions are not processed, preventing them from completing important tasks. The user needs help in resolving the form submission problem.",
    },
    {
      subject: "Mobile App Data Synchronization Failure",
      description:
        "User faces difficulties in synchronizing data across devices using the mobile app. The user attempts to sync data between their mobile devices and the app but encounters synchronization failures. Changes made on one device do not reflect on others, leading to data inconsistencies. The user relies on seamless synchronization for efficient work and requires assistance in resolving the synchronization issue.",
    },
    {
      subject: "Software Features Not Working as Described",
      description:
        "User finds that certain software features do not function as described in the documentation. The user refers to the software documentation to utilize specific features but notices discrepancies in functionality. Features that are supposed to perform certain actions do not work as expected, leading to confusion and frustration. The user requests clarification and assistance in understanding the correct usage of the software features.",
    },
    {
      subject: "Mobile App Connectivity Problems",
      description:
        "User experiences connectivity issues with the mobile app. The user's mobile device struggles to maintain a stable connection with the app's servers. As a result, the app's features, such as real-time updates and notifications, do not function reliably. The user's experience is marred by frequent disconnections, affecting their ability to use the app effectively. The user seeks assistance in resolving the mobile app's connectivity problems.",
    },
    {
      subject: "Website Session Expired Error",
      description:
        "User receives a 'Session Expired' error message while using the website. The user is actively engaged on the website but suddenly receives a 'Session Expired' error, logging them out of their account. Despite being in the middle of a task, the user is forced to re-enter login credentials and restart their work. The user needs help in understanding the cause of the session expiration and preventing its recurrence.",
    },
    {
      subject: "Software Font Rendering Issues",
      description:
        "User encounters problems with font rendering in the software interface. The user notices irregularities in font rendering, such as blurry or distorted characters, within the software's user interface. Text elements do not display clearly, impacting readability and user experience. The user requests assistance in resolving the font rendering issues to ensure a visually polished interface.",
    },
    {
      subject: "Mobile App Battery Drainage",
      description:
        "User observes excessive battery drainage while using the mobile app. The user notices a significant increase in battery consumption when the app is active, leading to rapid battery drainage on their mobile device. Other applications do not exhibit similar behavior, indicating a potential issue with the app's energy efficiency. The user requires help in identifying and rectifying the cause of excessive battery usage.",
    },
    {
      subject: "Software Graphical Glitches",
      description:
        "User experiences graphical glitches and anomalies in the software interface. The user observes graphical artifacts, such as flickering graphics, misplaced elements, or distorted visuals, while using the software. These glitches hinder the user's ability to navigate the interface smoothly and affect the overall aesthetics. The user seeks assistance in troubleshooting and eliminating the graphical anomalies for a seamless experience.",
    },
  ];

  console.log(tickets.length);
  for (const ticket of tickets) {
    ticket.customerId =
      customerIds[Math.floor(Math.random() * customerIds.length)];
      ticket.users = [userIdList[Math.floor(Math.random() * userIdList.length)]]
    const ticketResponse = await axios.post(ticketUrl, ticket);
    ticketIdList.push(ticketResponse.data.ticketId);
  }
};


const updateTicketStatus = async (ticketList) => {
  const ticketsToUpdate = getRandomItemsFromArray(ticketList, 0.4);

  const ticketStatusList = ["IN_PROGRESS", "COMPLETED"];
  console.log("here");
  for (let ticket of ticketsToUpdate) {
    const ticketUrl = `http://localhost:5001/ticket/${ticket}`;
    const ticketStatus =
      ticketStatusList[Math.floor(Math.random() * ticketStatusList.length)];
    const ticketResponse = await axios.put(ticketUrl, {
      ticketStatus: ticketStatus,
    });
    console.log(
      `Ticket ${ticketResponse.data.ticketId} status updated to: ${ticketStatus}.`,
    );
  }
};

sendPostRequests()
  .then(() => {
    console.log(
      "All user and customer requests completed. Starting ticket requests...",
    );
  })
  .then(() => {
    return sendTicketRequests();
  })
  .then(() => console.log("All helpdesk tickets submitted!"))
  .then(() => {
    return updateTicketStatus(ticketIdList);
  })
  .catch((error) => console.error(error));
