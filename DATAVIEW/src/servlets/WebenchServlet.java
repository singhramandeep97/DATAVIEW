package servlets;

import java.io.File;
import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import dataview.models.User;

@WebServlet(urlPatterns={"/webench/*"})
public class WebenchServlet extends HttpServlet{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	 /**
     * @see HttpServlet#HttpServlet()
     */
    public WebenchServlet() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		// TODO Auto-generated method stub
		try{
			String userId = (String)request.getParameter("userId");
			System.out.println("userId is " + userId);
			String tableLocation = getServletContext().getRealPath(request.getServletPath()).replace("webench", "") + "WEB-INF" + File.separator + "systemFiles" + File.separator + "users.table";
			User user = new User(userId, tableLocation);
			if(!user.doesUserExist()) {
				user.signup();
			}
			request.setAttribute("userId", userId);
			HttpSession session = request.getSession(true);
 			session.setAttribute("UserID", userId);
     		getServletConfig().getServletContext().getRequestDispatcher(
 			        "/workflow.jsp").forward(request,response);
  
     	}
     	catch(Exception e)
     	{
     		System.out.println(e.toString());
     	}
     	
	}
}
