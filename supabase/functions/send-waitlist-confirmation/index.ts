import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface WaitlistEmailRequest {
  name: string;
  email: string;
  company?: string;
  region?: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, company, region }: WaitlistEmailRequest = await req.json();

    console.log(`Sending confirmation email to ${email} for ${name}`);

    const emailResponse = await resend.emails.send({
      from: "ChainSight <onboarding@resend.dev>",
      to: [email],
      subject: "Welcome to ChainSight Beta Waitlist! 🎉",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8fafc;">
          <div style="background: linear-gradient(135deg, #3b82f6, #8b5cf6); padding: 30px; border-radius: 12px; text-align: center; margin-bottom: 30px;">
            <h1 style="color: white; margin: 0; font-size: 28px; font-weight: bold;">Welcome to ChainSight!</h1>
            <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0; font-size: 16px;">AI-Powered Risk Intelligence for Global Trade</p>
          </div>
          
          <div style="background: white; padding: 30px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
            <h2 style="color: #1e293b; margin-top: 0;">Hi ${name}! 👋</h2>
            
            <p style="color: #64748b; line-height: 1.6; margin-bottom: 20px;">
              Thank you for joining the ChainSight Beta waitlist! We're excited to have you on board as an early supporter.
            </p>

            <div style="background: #f8fafc; border-left: 4px solid #3b82f6; padding: 20px; margin: 25px 0; border-radius: 0 8px 8px 0;">
              <h3 style="color: #1e293b; margin-top: 0; font-size: 18px; display: flex; align-items: center;">
                💼 A Personal Note from Our CEO
              </h3>
              <p style="color: #64748b; line-height: 1.6; font-style: italic; margin-bottom: 15px;">
                "At ChainSight, we believe that powerful risk analytics and intelligent contract parsing shouldn't be exclusive to Fortune 500 companies. 
                Our mission is to democratize AI-powered risk intelligence, making it accessible and cost-effective for businesses of all sizes.
              </p>
              <p style="color: #64748b; line-height: 1.6; font-style: italic; margin-bottom: 15px;">
                Whether you're a growing startup navigating your first international contracts or an established enterprise looking to optimize your risk management, 
                ChainSight is designed to be your intelligent partner in understanding and mitigating risks before they impact your bottom line.
              </p>
              <p style="color: #64748b; line-height: 1.6; font-style: italic; margin-bottom: 0;">
                Thank you for believing in our vision. Together, we're building the future of intelligent risk management."
              </p>
              <p style="color: #1e293b; font-weight: bold; margin: 15px 0 0 0; text-align: right;">
                — Mashruf Habib, CEO & Founder
              </p>
            </div>
            
            <div style="background: #f1f5f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #1e293b; margin-top: 0; font-size: 18px;">What's Next?</h3>
              <ul style="color: #64748b; line-height: 1.6; padding-left: 20px;">
                <li>You'll be among the first to access ChainSight Beta</li>
                <li>We'll notify you as soon as early access is available</li>
                <li>Get ready to transform your risk management with AI</li>
                <li>Experience contract parsing that understands context, not just keywords</li>
              </ul>
            </div>
            
            ${company ? `<p style="color: #64748b; line-height: 1.6;"><strong>Company:</strong> ${company}</p>` : ''}
            ${region ? `<p style="color: #64748b; line-height: 1.6;"><strong>Region:</strong> ${region}</p>` : ''}
            
            <div style="background: linear-gradient(135deg, #10b981, #059669); padding: 20px; border-radius: 8px; margin: 30px 0; text-align: center;">
              <p style="color: white; margin: 0; font-weight: bold; font-size: 16px;">
                🎁 Early Bird Bonus: 3 Months FREE
              </p>
              <p style="color: rgba(255,255,255,0.9); margin: 5px 0 0 0; font-size: 14px;">
                For joining before our official launch
              </p>
            </div>
            
            <p style="color: #64748b; line-height: 1.6;">
              We're working hard to bring you the most advanced AI-powered risk intelligence platform. Stay tuned for updates!
            </p>
            
            <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 30px 0;">
            
            <p style="color: #94a3b8; font-size: 14px; text-align: center; margin: 0;">
              Best regards,<br>
              <strong style="color: #1e293b;">The ChainSight Team</strong>
            </p>
          </div>
          
          <p style="color: #94a3b8; font-size: 12px; text-align: center; margin-top: 20px;">
            You received this email because you signed up for the ChainSight Beta waitlist.
          </p>
        </div>
      `,
    });

    console.log("Confirmation email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ success: true, emailResponse }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-waitlist-confirmation function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);