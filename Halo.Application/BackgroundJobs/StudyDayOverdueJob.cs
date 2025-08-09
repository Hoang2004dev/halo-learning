using Halo.Application.Interfaces.Services;
using Microsoft.Extensions.Logging;
using Quartz;

namespace Halo.Application.BackgroundJobs
{
    public class StudyDayOverdueJob : IJob
    {
        private readonly IStudyDayService _service;
        private readonly ILogger<StudyDayOverdueJob> _logger;

        public StudyDayOverdueJob(IStudyDayService service, ILogger<StudyDayOverdueJob> logger)
        {
            _service = service;
            _logger = logger;
        }

        public async Task Execute(IJobExecutionContext context)
        {
            var updated = await _service.UpdateOverdueStatusAsync();
            _logger.LogInformation($"[StudyDayOverdueJob] Updated {updated} study days to Overdue.");
        }
    }
}
