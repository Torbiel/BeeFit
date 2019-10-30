﻿namespace BeeFit.API.Models
{
    public class UsersSearchPreference
    {
        public virtual User User { get; set; }
        public int UserId { get; set; }
        public virtual SearchPreference SearchPreference { get; set; }
        public int SearchPreferenceId { get; set; }
    }
}
