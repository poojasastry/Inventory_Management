/*  Merin.java
    Pooja Sastry  
    CS645
    Spring 2017
 */
import java.io.*;
import java.util.Vector;
import javax.servlet.*;
import javax.servlet.http.*;
import sdsu.*;



public class Merin extends HttpServlet { 
          
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
                             String skuval = (String) request.getParameter("sku");
                             String query = "SELECT sku FROM product WHERE sku='"+skuval+"'";
                             Vector<String[]> v = DBHelper.runQuery(query);
                             if(v.size()==0)
                             {
                              PrintWriter out = response.getWriter();
                              response.setContentType("text/html");
                                response.setCharacterEncoding("UTF-8");
                                String res="not ok";
                                response.getWriter().write(res);
                             }
                             else{
                        
     String query1 = "SELECT c.name,v.name,p.vendorModel,p.image FROM product p INNER JOIN category c ON p.catID=c.id INNER JOIN vendor v ON p.venID=v.id WHERE sku='"+skuval+"'";
     String query2 = "SELECT on_hand_quantity FROM on_hand WHERE sku='"+skuval+"'";     

    PrintWriter out = response.getWriter();  
    
    Vector<String[]> v1 = DBHelper.runQuery(query1);
     Vector<String[]> v2 = DBHelper.runQuery(query2);
    
    response.setContentType("text/html");
    response.setCharacterEncoding("UTF-8");
     String fd=" ";
   for(int i=0; i < v1.size(); i++) {
        String [] tmp = v1.elementAt(i);
       
        
        for(int j=0; j < tmp.length; j++)  
            fd += tmp[j]+"|";         
        }
         for(int i=0; i < v2.size(); i++) {
        String [] tmp2 = v2.elementAt(i);
       
        
        for(int j=0; j < tmp2.length; j++)  
            fd += tmp2[j]+"|";         
        }
    response.getWriter().write(fd);
  }
    }            
}



