//observer pattern (Syncing UI Updates)
// Observer interface
// Observer interface
interface Observer {
  update(data: any): void;
}

// Observable (Subject)
class EventBus {
  private observers: Observer[] = [];

  // Subscribe an observer
  subscribe(observer: Observer) {
      this.observers.push(observer);
  }

  // Unsubscribe an observer
  unsubscribe(observer: Observer) {
      this.observers = this.observers.filter(obs => obs !== observer);
  }

  // Notify all observers about the data update
  notify(data: any) {
      this.observers.forEach(observer => observer.update(data));
  }
}

  
  /* Example Observers (UI Components)
  class TaskListComponent implements Observer {
    update(data: any) {
      console.log("TaskListComponent updated:", data);
    }
  }
  
  class CalendarComponent implements Observer {
    update(data: any) {
      console.log("CalendarComponent updated:", data);
    }
  }
    */
  
  /* Example Usage:
  const eventBus = new EventBus();
  const taskList = new TaskListComponent();
  const calendar = new CalendarComponent();
  
  eventBus.subscribe(taskList);
  eventBus.subscribe(calendar);
  
  eventBus.notify({ taskCompleted: "Water Crops" }); // Notify all observers
  */