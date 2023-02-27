function About() {
  return (
    <div className="sm:w-2/3 sm:pr-8 sm:py-8  border-gray-200 sm:border-t-0 border-t mt-4 pt-4 sm:mt-0 text-center sm:text-left dark:text-zinc-200">
      <div className="leading-relaxed text-lg mb-4 whitespace-pre-line">
        <h1>About wydarzen.io</h1>
        <h2>Current features</h2>
        <ul>
          <li>Adding an event</li>
          <ul>
            Events dashboard
            <li>Filtering events (frontend)</li>
            <li>Searching for events (frontend)</li>
          </ul>
        </ul>
      </div>
    </div>
  );
}

export { About };
