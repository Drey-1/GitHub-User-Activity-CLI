const EVENT_MESSAGES = {
    CommitCommentEvent: (data) => `Commented on a commit in ${data.repo.name}.`,
    CreateEvent: (data) => `Created a ${data.payload.ref_type} named '${data.payload.ref}' in ${data.repo.name}.`,
    DeleteEvent: (data) => `Deleted a ${data.payload.ref_type} named '${data.payload.ref}' in ${data.repo.name}.`,
    ForkEvent: (data) => `Forked ${data.repo.name} to ${data.payload.forkee.full_name}.`,
    GollumEvent: (data) => `Updated the Wiki of ${data.repo.name}.`,
    IssueCommentEvent: (data) => `Commented on an issue in ${data.repo.name}.`,
    IssuesEvent: (data) => `${data.payload.action} an issue in ${data.repo.name}.`,
    MemberEvent: (data) => `${data.payload.action} member ${data.payload.member.login} in ${data.repo.name}.`,
    PublicEvent: (data) => `Made the repository ${data.repo.name} public.`,
    PullRequestEvent: (data) => `${data.payload.action} a pull request in ${data.repo.name}.`,
    PullRequestReviewEvent: (data) => `Reviewed a pull request in ${data.repo.name}.`,
    PullRequestReviewCommentEvent: (data) => `Commented on a pull request in ${data.repo.name}.`,
    PushEvent: (data) => `Pushed ${data.payload.commits.length} commits to ${data.repo.name}.`,
    ReleaseEvent: (data) => `Published a new release in ${data.repo.name}.`,
    SponsorshipEvent: (data) => `Sponsored a project in ${data.repo.name}.`,
    WatchEvent: (data) => `Starred ${data.repo.name}.`
};

async function searcher() {
    const user = process.argv[2];
    if (!user) {
        console.log("Please provide a GitHub username as a command line argument");
        return;
    }
    const url = `https://api.github.com/users/${user}/events`;
    try {
        const response = await fetch(url, {
            headers: {
                'Accept': 'application/vnd.github+json'
            }
        });
        if (!response.ok) {
            throw new Error(`${response.status} - ${response.statusText}`);
        }
        const data = await response.json();
        if (data.length === 0) {
            console.log("No recent activity found.");
            return;
        }
        data.forEach(event => {
            const messageHandler = EVENT_MESSAGES[event.type];
            if (messageHandler) {
                console.log(messageHandler(event));
                console.log("")
            } else {
                console.log(`Performed an action: ${event.type} in ${event.repo.name}.`);
            }
        });
    } catch (err) {
        console.error("Error:", err.message);
    }
}

searcher();