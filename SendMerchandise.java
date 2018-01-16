/*  SendMerchandise.java
    Pooja Sastry  
    CS645
    Spring 2017
 */

import java.io.*;
import javax.servlet.*;
import java.util.Vector;
import javax.servlet.http.*;
import sdsu.*;



public class SendMerchandise extends HttpServlet { 

        public void doPost(HttpServletRequest request,
              HttpServletResponse response)
                        throws IOException, ServletException  {
        processRequest(request, response);         
        }

    public void doGet(HttpServletRequest request,
              HttpServletResponse response)
                        throws IOException, ServletException  { 
        //throw new ServletException("GET protocol is not supported, POST only");
                           processRequest(request, response);
        } 
        
   private void processRequest(HttpServletRequest request,
              HttpServletResponse response) 
                        throws IOException, ServletException {
    String skuval = (String) request.getParameter("sku2");
    String dateval = (String) request.getParameter("date2");
    String qtyval = (String) request.getParameter("quantity2");
                              
     String query = "INSERT into merchandise_out values('"+skuval+"','"+dateval+"','"+qtyval+"')"; 
    int count = DBHelper.executeCommand(query);

    String query2 = "SELECT on_hand_quantity FROM on_hand WHERE sku='"+skuval+"'";
    Vector<String[]> v = DBHelper.runQuery(query2);

    //if(v.size()!=0)
    //{
    String sval=v.get(0)[0];
    int newqty = Integer.parseInt(sval)-Integer.parseInt(qtyval);

        String query3 = "UPDATE on_hand SET on_hand_quantity='"+newqty+"' WHERE sku='"+skuval+"'";

        int count3 = DBHelper.executeCommand(query3);   
         if(count==1)
    {
         
        String query4 = "SELECT on_hand_quantity FROM on_hand WHERE sku='"+skuval+"'";
     PrintWriter out = response.getWriter();  
    
    Vector<String[]> v2 = DBHelper.runQuery(query4);
    response.setContentType("text/html");
    response.setCharacterEncoding("UTF-8");
     String res=" ";
   for(int i=0; i < v2.size(); i++) {
        String [] tmp = v2.elementAt(i);
       
        for(int j=0; j < tmp.length; j++)  
            res += tmp[j]+"|";         
        }
    response.getWriter().write(res);
}
    }               
}



