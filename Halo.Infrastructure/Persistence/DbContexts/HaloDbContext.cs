using Halo.Domain.Entities;
using Halo.Infrastructure.Extensions;
using Microsoft.EntityFrameworkCore;

namespace Halo.Infrastructure.Persistence.DbContexts
{
    public class HaloDbContext : DbContext
    {
        public HaloDbContext(DbContextOptions<HaloDbContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }
        public DbSet<RefreshToken> RefreshTokens { get; set; }

        public DbSet<StudyDay> StudyDays { get; set; }
        public DbSet<VocabItem> VocabItems { get; set; }
        public DbSet<ListeningItem> ListeningItems { get; set; }
        public DbSet<SpeakingItem> SpeakingItems { get; set; }
        public DbSet<GrammarItem> GrammarItems { get; set; }
        public DbSet<WritingItem> WritingItems { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasDefaultSchema("public");

            // ------------------- User -------------------
            modelBuilder.Entity<User>(entity =>
            {
                entity.ToTable("users");
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Username).IsRequired().HasMaxLength(100);
                entity.Property(e => e.Email).IsRequired().HasMaxLength(200);
                entity.Property(e => e.PasswordHash).IsRequired().HasMaxLength(255);
                entity.Property(e => e.Role).HasConversion<string>().HasMaxLength(20);
                entity.Property(e => e.Status).HasConversion<string>().HasMaxLength(20);
                entity.Property(e => e.CreatedAt).HasColumnType("timestamptz");
            });

            // ------------------- RefreshToken -------------------
            modelBuilder.Entity<RefreshToken>(entity =>
            {
                entity.ToTable("refresh_tokens");
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Token)
                    .IsRequired()
                    .HasMaxLength(255);
                entity.Property(e => e.ExpiresAt)
                    .HasColumnType("timestamptz");
                entity.Property(e => e.CreatedAt)
                    .HasColumnType("timestamptz");
                entity.Property(e => e.IsRevoked)
                    .IsRequired();
                entity.Property(e => e.DeviceInfo)
                    .HasMaxLength(512)
                    .HasColumnName("device_info");
                entity.HasOne(rt => rt.User)
                      .WithMany(u => u.RefreshTokens)
                      .HasForeignKey(rt => rt.UserId)
                      .OnDelete(DeleteBehavior.Cascade);
            });

            // ------------------- StudyDay -------------------
            modelBuilder.Entity<StudyDay>(entity =>
            {
                entity.ToTable("study_days");
                entity.HasKey(e => e.Id);

                entity.Property(e => e.TargetDate)
                      .IsRequired()
                      .HasColumnType("timestamptz");

                entity.Property(e => e.Status)
                      .HasConversion<string>()
                      .HasMaxLength(20);

                entity.Property(e => e.Note)
                      .HasMaxLength(1000);

                entity.HasOne(e => e.User)
                      .WithMany(u => u.StudyDays)
                      .HasForeignKey(e => e.UserId)
                      .OnDelete(DeleteBehavior.Cascade);

                entity.HasIndex(e => new { e.UserId, e.TargetDate }).IsUnique();
            });

            // ------------------- VocabItem -------------------
            modelBuilder.Entity<VocabItem>(entity =>
            {
                entity.ToTable("vocab_items");
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Word).IsRequired().HasMaxLength(100);
                entity.Property(e => e.NativeMeaning).IsRequired().HasMaxLength(255);
                entity.Property(e => e.ForeignMeaning).IsRequired().HasMaxLength(255);
                entity.Property(e => e.Example).HasMaxLength(500);
                entity.Property(e => e.AudioUrl).HasMaxLength(255);
                entity.Property(e => e.Description).HasMaxLength(5000);
                entity.Property(e => e.Status).HasConversion<string>().HasMaxLength(20);

                entity.HasOne(e => e.StudyDay)
                      .WithMany(d => d.VocabItems)
                      .HasForeignKey(e => e.StudyDayId)
                      .OnDelete(DeleteBehavior.Cascade);
            });

            // ------------------- ListeningItem -------------------
            modelBuilder.Entity<ListeningItem>(entity =>
            {
                entity.ToTable("listening_items");
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Title).IsRequired().HasMaxLength(200);
                entity.Property(e => e.AudioUrl).IsRequired().HasMaxLength(255);
                entity.Property(e => e.Transcript).HasColumnType("text");
                entity.Property(e => e.FillInContent).HasColumnType("text");
                entity.Property(e => e.Score).HasPrecision(5, 2);

                entity.HasOne(e => e.StudyDay)
                      .WithMany(d => d.ListeningItems)
                      .HasForeignKey(e => e.StudyDayId)
                      .OnDelete(DeleteBehavior.Cascade);
            });

            // ------------------- SpeakingItem -------------------
            modelBuilder.Entity<SpeakingItem>(entity =>
            {
                entity.ToTable("speaking_items");
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Prompt).IsRequired().HasMaxLength(500);
                entity.Property(e => e.AudioUrl).HasMaxLength(255);
                entity.Property(e => e.TranscriptByAI).HasColumnType("text");
                entity.Property(e => e.Feedback).HasColumnType("text");

                entity.HasOne(e => e.StudyDay)
                      .WithMany(d => d.SpeakingItems)
                      .HasForeignKey(e => e.StudyDayId)
                      .OnDelete(DeleteBehavior.Cascade);
            });

            // ------------------- GrammarItem -------------------
            modelBuilder.Entity<GrammarItem>(entity =>
            {
                entity.ToTable("grammar_items");
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Topic).IsRequired().HasMaxLength(200);
                entity.Property(e => e.Explanation).HasColumnType("text");
                entity.Property(e => e.Exercise).HasColumnType("text");
                entity.Property(e => e.Answer).HasColumnType("text");
                entity.Property(e => e.Description).HasMaxLength(5000);

                entity.HasOne(e => e.StudyDay)
                      .WithMany(d => d.GrammarItems)
                      .HasForeignKey(e => e.StudyDayId)
                      .OnDelete(DeleteBehavior.Cascade);
            });

            // ------------------- WritingItem -------------------
            modelBuilder.Entity<WritingItem>(entity =>
            {
                entity.ToTable("writing_items");
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Prompt).IsRequired().HasMaxLength(300);
                entity.Property(e => e.Content).HasColumnType("text");
                entity.Property(e => e.Suggestion).HasColumnType("text");
                entity.Property(e => e.Feedback).HasColumnType("text");

                entity.HasOne(e => e.StudyDay)
                      .WithMany(d => d.WritingItems)
                      .HasForeignKey(e => e.StudyDayId)
                      .OnDelete(DeleteBehavior.Cascade);
            });

            modelBuilder.UseUtcDateTime();

            base.OnModelCreating(modelBuilder);
        }
    }
}
