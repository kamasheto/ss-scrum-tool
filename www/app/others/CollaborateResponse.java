package others;

import java.util.*;

import models.*;

public class CollaborateResponse {
	public List<Notification> news;
	
	public List<User.Object> online_users;
	
	public List<CollaborateUpdate> updates;
	
	public long last_update;
}