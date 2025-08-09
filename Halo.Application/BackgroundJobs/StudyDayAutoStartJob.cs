using Halo.Application.Interfaces.Services;
using Microsoft.Extensions.Logging;
using Quartz;

namespace Halo.Application.BackgroundJobs
{
    public class StudyDayAutoStartJob : IJob
    {
        private readonly IStudyDayService _service;
        private readonly ILogger<StudyDayAutoStartJob> _logger;

        public StudyDayAutoStartJob(IStudyDayService service, ILogger<StudyDayAutoStartJob> logger)
        {
            _service = service;
            _logger = logger;
        }

        public async Task Execute(IJobExecutionContext context)
        {
            var updated = await _service.UpdateAutoStartAsync();
            _logger.LogInformation($"[StudyDayAutoStartJob] Auto-started {updated} study days.");
        }
    }
}
