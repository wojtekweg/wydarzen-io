# Design patterns to be used

## Backend

### MVC

It's Django core concept, which will be used in backend architecture. Model is responsible for data representation, view is for displaying the content (in case of this project, React frontend will be used instead of Django templates) and controller to gather logic that connects the both. 

### Facade

Facade will separate the Django backend from the React frontend by isolating some of operations possible in system by sharing an API, leaving some of operations only for the backend and allowing only selected endpoints for a frontend.

For example, it won't be possible by an user or even an API to mark the event as past - it will be managed out by the backend and it won't be possible to mark event as past from the user point of view or the frontend code.

### Adapter

Event object will have an abstract class that will be inherited (as for now) by two separate classes that will tell whether an event is online or local. Some events will be online and others will be in real world, what will affect the event object, because it will result in difference of having a place assigned to the object or not. Creating or displaying an event won't have to specify that, because it will be updated once it will be specified and online events won't have a place (or it will be default for all online events).

Another possible use is importing or exporting an event, that will be possible in different formats of user choice (.json, .csv, .xlsx).

### Decorator

Some objects will be wrapped in decorator, which will say whether the given user should be able to take the action. 

For example, deleting the events won't be possible for anybody other than an admin.  

## Frontend

### Dependency Injection

Instead of having hardcoded values of design choices, will be used the dependency injection design pattern, so each of design choice will be specified in special file that will be imported in the React code. 

For example, using a bootstrap tags will be done by importing them from another file, so when I will decide to change bootstrap for any other UI library or change the design choice (for example from `button is-info` to `button is-info is-light` when using Bulma library), then I will have to do it only in one place, having all the page design consistent. 

```jsx
// ❌
<button className="btn btn-info mr-2">Edit</button>

// ✅
import { infoButton } from 'buttons'
<button className={infoButton}>Edit</button>
```

### Factory Method

The factory pattern encapsulates the process of creating a component. It is especially useful when creating components out of REST data.

For example, rendering an error message may be different depending of API response code.

## UI tests

### Page Object Model

Each page available for an user will have created separate page class that will have all page-specific locators and methods in their file, that will be used directly in the test scripts. 

For example separate page class will be created for an event subpage and another for the user profile.

### Chain of responsibility

Instead of having random order of tests execution in the UI tests, it will be organised by the chain or responsibility design pattern, so the tests will have to pass in sequential order.

First test will have to validate that the website is loading and displaying all of the content properly. If that test will be passed, then the test of user registering will be started. After that the test of user login and so on, another tests will be triggered. After that, other tests will be run asynchronously to provide quicker runtime (testing of sorting the page can be done in parallel of filtering the content made in another window).

---

- Sources
    - [https://refactoring.guru/pl/design-patterns/structural-patterns](https://refactoring.guru/pl/design-patterns/structural-patterns)
    - https://github.com/themithy/react-design-patterns