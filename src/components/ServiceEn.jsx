import React from 'react';
import { useNavigate } from 'react-router';
import { CloseIcon } from 'assets';
import style from 'styles/PolicyPrivacy.module.css';

const ServiceEn = () => {
  const navigate = useNavigate();

  return (
    <div className={style.contents__wrap}>
      <button type="button" aria-label="close_button" className={style.icon} onClick={() => navigate(-1)}>
        <CloseIcon width={16} height={16} fill={'var(--color-black)'} />
      </button>
      <h2>TERMS OF USE</h2>
      <section>
        <h2>
          <b>1. ACCEPTANCE OF TERMS OF USE</b>
        </h2>
        <p>
          Welcome to “Picks”, a website (“Website”) owned and operated by Kowave M co.,Ltd, a Korean corporation
          (“Kowave”). Access to and services on the Website are provided to you subject to the following terms and
          conditions of use. These terms of use are referred to as the “Terms of Use”. In these Terms of Use, the words
          “you”, “your” and “User” refer to a user using the Website, and “we”, “us”, “our” and “Kowave” refer to
          Kowave, and “Services” refers to all services provided by us on the Website. <br />
          <br />
          <b>
            PLEASE READ THESE TERMS OF USE AND OUR PRIVACY POLICY, FOUND ON THE WEBSITE, CAREFULLY BEFORE ACCESSING OR
            USING THE WEBSITE. BY ACTUALLY ACCESSING OR USING THE WEBSITE AND THE SERVICES, USERS ARE DEEMED TO HAVE
            AGREED TO THESE TERMS OF USE AND THE PRIVACY POLICY, WHICH CONSTITUTE A BINDING AGREEMENT BETWEEN YOU AND
            US. IF AT ANY TIME ANY TERM OF THESE TERMS OF USE IS NO LONGER ACCEPTABLE TO YOU, YOU SHOULD IMMEDIATELY
            CEASE ALL USE OF THE WEBSITE AND THE SERVICES.
          </b>
          <br />
        </p>
      </section>
      <section>
        <h2>
          <b>2. USE OF THE WEBSITE</b>
        </h2>
        <p>
          This Website is offered and available to, and you may use the Services, only if you are 16 years old or older.
          If you do not meet this requirement, you shall not access or use the Website or the Services.
          <br />
        </p>
      </section>
      <section>
        <h2>
          <b>3. FEES</b>
        </h2>
        <p>
          Currently, Kowave does not charge Users any fees in consideration for any Services. In case we start charging
          fees for any Services provided on the Website, Kowave will inform you of details of such paid Services,
          applicable fees and payment method in the Website. If a User fails to pay any such fee when it is due, you
          will be charged a default penalty at the rate of 5% per annum.
        </p>
      </section>
      <section>
        <h2>
          <b>4. PROPRIETARY RIGHTS</b>
        </h2>
        <p>
          The Website is owned and operated by Kowave. <br />
          <br />
          Kowave and its licensors and third-party content providers exclusively own all right, title and interest in
          and to the Services and all Content that is not News Content, Advertising Content, including all associated
          intellectual property rights. All rights to the News Content and Advertising Content are retained by
          third-party licensors, third-party content providers and third-party advertisers that are the source of such
          Content. You acknowledge that the Services and Content are protected by copyright, trademark, and other
          relevant laws. You agree not to remove, alter or obscure any copyright, trademark, service mark or other
          proprietary rights notices incorporated in or accompanying the Services or Content. “Content” means text,
          graphics, images, music, software, audio, video, content, works of authorship of any kind, and information or
          other materials that are posted, generated, distributed, disseminated, provided or otherwise made available
          through the Services. “News Content” means any and all Content provided via the Services that comprises news
          contents of the Website. “Advertising Content” means advertising provided via the Services on behalf of third
          parties. “User Content” means any and all Content provided by users via the Services.
          <br />
          <br />
          These Terms of Use permit you to use the Website and the Services for your personal, non-commercial use only.
          Except as expressly provided herein, nothing contained herein shall be construed as granting to Users a
          license of any of the rights set forth above, whether by estoppel, implication or otherwise. Notwithstanding
          the foregoing, these Terms of Use do not authorize you to, and you may not, copy, distribute, transfer,
          modify, publicly display, publicly perform or create derivative works based upon, any Content without our or
          our partners’ permission.
          <br />
          <br />
        </p>
      </section>
      <section>
        <h2>
          <b>5. PRIVACY POLICY</b>
        </h2>
        <p>
          Please review our Privacy Policy to learn more about how we collect and use personal information provided by
          you via your access to the Website and use of our Services.
          <br />
          <br />
        </p>
      </section>
      <section>
        <h2>
          <b>6. WARRANTIES; DISCLAIMER</b>
        </h2>
        <p>
          You must comply with all applicable laws, rules and regulations in relation to your use of or access to the
          Website or the Services.
          <br />
          <br />
          Your access to the Website and use of the Services is at your own risk. If you are dissatisfied with the
          Services or any contents on the Website, or with any term of these Terms of Use, your sole and exclusive
          remedy is to discontinue accessing and using the Website and the Services. KOWAVE DOES NOT WARRANT THAT THE
          SEVICES WILL BE UNINTERRUPTED OR ERROR-FREE, NOR DOES KOWAVE WARRANT THAT ANY DEFECTS IN THE SERVICES OR
          INACCURACIES IN THE CONTENTS ON THE WEBSITE OR CONTAINED IN THE SERVICES WILL BE CORRECTED.
          <br />
          <br />
          WITHOUT LIMITING THE FOREGOING, THE WEBSITE AND ALL CONTENTS ON THE WEBSITE ARE PROVIDED TO YOU "AS IS". THE
          SERVICES ARE BASED ON INFORMATION CONSTANTLY CHANGING, AND THE SERVICES INCLUDE VARIOUS UNKNOWABLE FACTORS.
          NONE OF KOWAVE, ITS THIRD-PARTY CONTENT PROVIDERS AND OTHER LICENSORS AND ITS AND THEIR RESPECTIVE OFFICERS,
          DIRECTORS, EMPLOYEES AND AGENTS MAKE ANY WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING, WITHOUT
          LIMITATION, WARRANTIES OF COMPLETENESS, ACCURACY, APPLICABILITY, EXPEDIENCY, USABILITY, SAFETY, OR CERTAINTY
          OF THE INFORMATION ON THE WEBSITE, INCLUDING BUT NOT LIMITED TO WRITINGS, IMAGES, DATA AND OTHER INFORMATION.{' '}
          <br />
          <br />
          ALSO, NONE OF KOWAVE, ITS LICENSORS AND ITS THIRD-PARTY CONTENT PROVIDERS AND ITS AND THEIR RESPECTIVE
          OFFICERS, DIRECTORS, EMPLOYEES AND AGENTS MAKE ANY WARRANTIES OF TITLE OR IMPLIED WARRANTIES OF
          MERCHANTABILITY OR FITNESS FOR A PARTICULAR PURPOSE, WITH RESPECT TO THE WEBSITE, THE SERVICES OR ANY CONTENTS
          THEREIN OR ANY PRODUCTS OR SERVICES PROVIDED, OBTAINED, TRANSPORTED, OR DEALED WITH, DIRECTLY OR INDIRECTLY,
          THROUGH USE OF THE WEBSITE OR THE SERVICES. <br />
          <br />
          YOU EXPRESSLY AGREE THAT THE ENTIRE RISK AS TO THE QUALITY AND PERFORMANCE OF THE WEBSITE IS ASSUMED SOLELY BY
          YOU.
          <br />
          <br />
          YOU SPECIFICALLY ACKNOWLEDGE AND AGREE THAT KOWAVE AND ITS OFFICERS, DIRECTORS, EMPLOYEES AND AGENTS ARE NOT
          LIABLE FOR ANY DEFAMATORY, OFFENSIVE OR ILLEGAL CONDUCT OF ANY USER. IN ADDITION, WHILE WE INTEND TO TAKE
          REASONABLE STEPS TO PREVENT THE INTRODUCTION OF VIRUSES OR OTHER DESTRUCTIVE OR HARMFUL CODES OR MATERIALS TO
          THE WEBSITE, WE DO NOT WARRANT, GUARANTEE OR MAKE ANY REPRESENTATIONS THAT THE WEBSITE, THE SERVICES OR ANY
          CONTENTS MADE AVAILABLE THROUGH THE USE OF THE WEBSITE OR THE SERVICES WILL BE FREE OF VIRUSES OR DESTRUCTIVE
          OR HARMFUL CODES OR MATERIALS AND WE SHALL NOT BE LIABLE, FOR ANY VIRUSES OR OTHER DESTRUCTIVE OR HARMFUL
          CODES OR MATERIALS THAT MAY INFECT OR DAMAGE YOUR COMPUTER EQUIPMENT OR OTHER PROPERTIES IN RELATION TO USE OF
          THE WEBSITE, THE SERVICES OR THE SERVER THAT MAKES THE WEBSITE AVAILABLE, OR YOUR DOWNLOADING OF ANY CONTENTS
          FROM THE WEBSITE.
          <br />
          <br />
        </p>
      </section>
      <section>
        <h2>
          <b>7. LIMITATION OF LIABILITY</b>
        </h2>
        <p>
          TO THE FULLEST EXTENT PERMISSIBLE UNDER APPLICABLE LAW, KOWAVE AND ITS LICENSORS AND ANY THIRD-PARTY CONTENT
          PROVIDERS, AND ITS AND THEIR RESPECTIVE OFFICERS, DIRECTORS, EMPLOYEES AND AGENTS, ARE NOT LIABLE FOR ANY
          DIRECT, INCIDENTAL, CONSEQUENTIAL, SPECIAL, INDIRECT, OR PUNITIVE DAMAGES ARISING OUT OF YOUR ACCESS TO, OR
          USE OF, OR INABILITY TO ACCESS OR USE THIS WEBSITE, INCLUDING BUT NOT LIMITED TO DAMAGES FOR HARM TO BUSINESS,
          LOST PROFITS, LOST SAVINGS, OR LOST REVENUES, HOWEVER SUCH DAMAGES ARE CAUSED AND WHETHER BASED ON CONTRACT,
          TORT (INCLUDING NEGLIGENCE) OR ANY OTHER THEORY OF LIABILITY. THE FOREGOING LIMITATIONS SHALL APPLY REGARDLESS
          OF WHETHER KOWAVE, ANY OF ITS LICENSORS AND THIRD-PARTY CONTENT PROVIDERS, OR ANY OF ITS OR THEIR RESPECTIVE
          OFFICERS, DIRECTORS, EMPLOYEES AND AGENTS HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
          <br />
          <br />
          IN THE EVENT YOU TRANSMIT, INTRODUCE, OR OTHERWISE CAUSE ANY TECHNICAL DISRUPTION TO THE WEBSITE OR THE
          SERVICES, YOU AGREE TO BE RESPONSIBLE FOR ANY AND ALL LIABILITIES, DAMAGES, COSTS AND EXPENSES (INCLUDING
          ATTORNEYS’ FEES AND EXPENSES) ARISING FROM OR IN RELATION TO ANY AND ALL CLAIMS BROUGHT BY THIRD PARTIES BASED
          UPON SUCH TECHNICAL DISRUPTIONS. "TECHNICAL DISRUPTION" MEANS DISTRIBUTION OF UNSOLICITED ADVERTISING OR CHAIN
          LETTERS, PROPAGATION OF COMPUTER WORMS, VIRUSES OR OTHER HARMFUL CODE, AND/OR USING THE WEBSITE TO MAKE
          UNAUTHORIZED ENTRY TO ANY OTHER MACHINE ACCESSIBLE VIA THE WEBSITE. <br />
          <br />
        </p>
      </section>
      <section>
        <h2>
          <b>8. PROHIBITED ACTIONS</b>
        </h2>
        <p>
          When using the Website or the Services, Users shall not conduct any of the following acts or any act that we
          determine falls under any of the followings:
          <br />
          <br />
          a. acts that violate any laws or regulations, court judgments or orders, or administrative orders that are
          legally binding;
          <br />
          <br />
          b. acts against public order and good morals;
          <br />
          <br />
          c. acts that infringe copyright, patent, trademark, and other intellectual property rights, right of likeness,
          privacy right, right to reputation, or any other rights or interests of Kowave, other Users or other third
          parties;
          <br />
          <br />
          d. acts attempting to gain unauthorized access to or attacking our network, servers or systems, including but
          not limited to placing an excessive burden on servers, acts trying to improperly control, damage, or
          manipulate our servers or Services by using BOT or any other technical tools or methods, or acts that threaten
          to interrupt the operation or functions of the Services;
          <br />
          <br />
          e. use any manual process to monitor or copy any of the material or content on the Website;
          <br />
          <br />
          f. acts that aide, abets or encourages any of the acts above; and
          <br />
          <br />
          g. any other acts that Kowave determines are improper.
          <br />
          <br />
        </p>
      </section>
      <section>
        <h2>
          <b>9. TERMINATION AND RESTRICTION</b>
        </h2>
        <p>
          We reserve the right, in our sole discretion, to restrict, suspend or terminate your access to all or any part
          of the Website or the Services at any time, without prior notice or liability, in the event of any violation
          by you of these Terms of Use, including Article 8 (Prohibited Actions) above.
          <br />
          <br />
        </p>
      </section>
      <section>
        <h2>
          <b>10. MODIFICATION, TERMINATION AND SUSPENSION OF THE SERVICES</b>
        </h2>
        <p>
          We shall be entitled to at any time and for any reason modify, close, or suspend the Website or the Services,
          including but not limited to the availability of any feature, database, or contents on the Website or the
          Services, without prior notice or liability, in our sole discretion; provided, however, that if and to the
          extent practical, we will inform you of such modification, close and/or suspension by posting it on the
          Website. <br />
          <br />
          We shall not be liable for any damages incurred by Users arising out of, or in connection with, any actions
          taken by us pursuant to this Article. We shall also not be liable for any damages, costs or expenses incurred
          arising out of, or in connection with, any inability, delay or trouble with regard to providing the whole or
          part of the Services.
          <br />
        </p>
      </section>
      <section>
        <h2>
          <b>11. AMENDMENTS</b>
        </h2>
        <p>
          We reserve the right, in our discretion, to change any or all of these Terms of Use at any time. If we make
          any change to these Terms of Use, we will notify Users in advance through a notice on the Website at least 7
          days prior to the change. However, we will notify Users at least 30 days in advance in the event of any major
          change.
        </p>
      </section>
      <section>
        <h2>
          <b>12. MISCELLANEOUS</b>
        </h2>
        <p>
          These Terms of Use constitute the entire agreement between you and Kowave relating to the subject matter
          herein.
          <br />
          <br />
          If any provision of these Terms of Use shall be unlawful, void, or for any reason unenforceable, then that
          provision shall be deemed severable from these Terms of Use and shall not affect the validity and
          enforceability of any remaining provisions. <br />
          <br />
          Failure by Kowave, at any time, to exercise its right under these Terms of Use, or any delay to do so shall
          not be construed as a waiver of any right accruing under these Terms of Use, nor change these Terms of Use in
          any sense.
          <br />
          <br />
          These Terms of Use shall be construed and governed in accordance with the laws of Korea, and Users and Kowave
          irrevocably consent that any and all disputes arising out of or in connection with these Terms of Use shall be
          submitted to the exclusive jurisdiction of the Seoul Central District Court in the first instance.
          <br />
          <br />
          <b>
            IF YOU DO NOT AGREE TO ALL OF THESE TERMS OF USE OR ARE NOT AUTHORIZED TO AGREE TO THESE TERMS OF USE,
            PLEASE DISCONTINUE ACCESSING AND USING THE WEBSITE IMMEDIATELY.{' '}
          </b>
          <br />
          <br />
          Last Updated: November 8, 2021
          <br />
          <br />
          Copyright: Kowave M co.,Ltd
          <br />
        </p>
      </section>
    </div>
  );
};

export default ServiceEn;
