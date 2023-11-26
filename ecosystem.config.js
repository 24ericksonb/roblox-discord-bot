module.exports = {
    apps: [{
        name: 'roblox-bot',
        script: 'npm',
        args: 'start',
        cron_restart: '0 0 * * *',
        watch: true,
    }]
};
