using Halo.Application.BackgroundJobs;
using Microsoft.Extensions.DependencyInjection;
using Quartz;

namespace Halo.Infrastructure.Schedulers
{
    public static class QuartzSchedulerConfig
    {
        public static void AddQuartzJobs(this IServiceCollection services)
        {
            // Job: Update Overdue
            var overdueKey = new JobKey("StudyDayOverdueJob");
            services.AddQuartz(q =>
            {
                q.AddJob<StudyDayOverdueJob>(opts => opts.WithIdentity(overdueKey));
                q.AddTrigger(t => t
                    .ForJob(overdueKey)
                    .WithIdentity("StudyDayOverdueTrigger")
                    .WithCronSchedule("0 5 0 * * ?")); // 0h05 mỗi ngày

                // Job: Auto start today
                var autoStartKey = new JobKey("StudyDayAutoStartJob");
                q.AddJob<StudyDayAutoStartJob>(opts => opts.WithIdentity(autoStartKey));
                q.AddTrigger(t => t
                    .ForJob(autoStartKey)
                    .WithIdentity("StudyDayAutoStartTrigger")
                    .WithCronSchedule("0 0 0 * * ?")); // 0h00 mỗi ngày
            });

            services.AddQuartzHostedService(opt => opt.WaitForJobsToComplete = true);
        }
    }
}
