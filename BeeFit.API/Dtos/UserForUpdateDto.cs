namespace BeeFit.API.Dtos
{
    public class UserForUpdateDto
    {
        public string Username { get; set; }
        public string Email { get; set; }
        public string OldPassword { get; set; }
        public string NewPassword { get; set; }
    }
}
