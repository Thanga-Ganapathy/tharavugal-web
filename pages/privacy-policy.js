import Link from '@/components/app/Link';
import Layout from '@/components/layouts/DefaultLayout';
import { Alert, Box, Paper, Typography } from '@mui/material';

export default function PrivacyPolicy() {
  return (
    <Layout title="Privacy Policy">
      <Box textAlign="center">
        <Typography variant="h4" fontWeight="bold">
          Privacy Policy
        </Typography>
      </Box>
      <Paper sx={{ p: 5, mt: 2 }}>
        <Box sx={{ textAlign: 'right' }}>Last updated: May 27, 2023</Box>

        <Alert severity="warning">
          Please read these privacy policy carefully before using our service.
        </Alert>

        <Box mt={2}>
          <Typography variant="h5" fontWeight="bold">
            Introduction
          </Typography>
          <p>
            This Privacy Policy describes Our policies and procedures on the
            collection, use and disclosure of Your information when You use the
            Service and tells You about Your privacy rights and how the law
            protects You.
          </p>
          <p>
            We use Your Personal data to provide and improve the Service. By
            using the Service, You agree to the collection and use of
            information in accordance with this Privacy Policy.
          </p>
        </Box>

        <Box mt={2}>
          <Typography variant="h5" fontWeight="bold">
            About Us
          </Typography>
          Please <Link href="/about-us">click here to read.</Link>
        </Box>

        <Box mt={2}>
          <Typography variant="h5" fontWeight="bold">
            Definitions
          </Typography>
          <p>For the purposes of this Privacy Policy:</p>
          <ul>
            <li>
              <p>
                <strong>Account</strong> means a unique account created for You
                to access our Service or parts of our Service.
              </p>
            </li>
            <li>
              <p>
                <strong>Organization/Web Application</strong> (&quot;We&quot;,
                &quot;Us&quot; or &quot;Our&quot; in this Agreement) refers to
                https://tharavugal.org.
              </p>
            </li>
            <li>
              <p>
                <strong>Cookies</strong> are small files that are placed on Your
                computer, mobile device or any other device by a website,
                containing the details of Your browsing history on that website
                among its many uses.
              </p>
            </li>
            <li>
              <p>
                <strong>Device</strong> means any device that can access the
                Service such as a computer, a cellphone or a digital tablet.
              </p>
            </li>
            <li>
              <p>
                <strong>Personal Data</strong> is any information that relates
                to an identified or identifiable individual.
              </p>
            </li>
            <li>
              <p>
                <strong>Service</strong> refers to this website/web
                application/organization.
              </p>
            </li>
            <li>
              <p>
                <strong>You</strong> means the individual accessing or using the
                Service, or the organization, or other legal entity on behalf of
                which such individual is accessing or using the Service, as
                applicable.
              </p>
            </li>
          </ul>
          <Typography variant="h5" fontWeight="bold">
            Collecting and Using Your Personal Data
          </Typography>
          <Typography variant="h5" fontWeight="bold">
            Types of Data Collected
          </Typography>
          <h3>Personal Data</h3>
          <p>
            While creating account here, We may ask You to provide Us with
            certain personally identifiable information that can be used to
            contact or identify You. Personally identifiable information may
            include, but is not limited to:
          </p>
          <ul>
            <li>
              <p>Email address</p>
            </li>
            <li>
              <p>First name and last name</p>
            </li>
            <li>
              <p>Phone number</p>
            </li>
          </ul>
          <h3>Usage Data</h3>
          <p>Currently, we do not collect Usage Data when using the Service.</p>
          <p>
            Usage Data may include information such as Your Device&apos;s
            Internet Protocol address (e.g. IP address), browser type, browser
            version, the pages of our Service that You visit, the time and date
            of Your visit, the time spent on those pages, unique device
            identifiers and other diagnostic data.
          </p>
          <p>
            When You access the Service by or through a mobile device, We may
            collect certain information automatically, including, but not
            limited to, the type of mobile device You use, Your mobile device
            unique ID, the IP address of Your mobile device, Your mobile
            operating system, the type of mobile Internet browser You use,
            unique device identifiers and other diagnostic data.
          </p>
          <p>
            We may also collect information that Your browser sends whenever You
            visit our Service or when You access the Service by or through a
            mobile device.
          </p>
          <h3>Tracking Technologies and Cookies</h3>
          <p>Currently, we do not use cookies or other similar technologies.</p>
          <Typography variant="h5" fontWeight="bold">
            Use of Your Personal Data
          </Typography>
          <p>
            The organization may use Personal Data for the following purposes:
          </p>
          <ul>
            <li>
              <p>
                <strong>To provide and maintain our Service</strong>, including
                to monitor the usage of our Service.
              </p>
            </li>
            <li>
              <p>
                <strong>To manage Your Account:</strong> to manage Your
                registration as a user of the Service. The Personal Data You
                provide can give You access to different functionalities of the
                Service that are available to You as a registered user.
              </p>
            </li>
            <li>
              <p>
                <strong>To contact You:</strong> To contact You by email,
                telephone calls, SMS, or other equivalent forms of electronic
                communication, such as a mobile application&apos;s push
                notifications regarding updates or informative communications
                related to the functionalities, including the security updates,
                when necessary or reasonable for their implementation.
              </p>
            </li>
            <li>
              <p>
                <strong>To manage Your requests:</strong> To attend and manage
                Your requests to Us.
              </p>
            </li>
          </ul>
          <Typography variant="h5" fontWeight="bold">
            Retention of Your Personal Data
          </Typography>
          <p>
            The organization will retain Your Personal Data only for as long as
            is necessary for the purposes set out in this Privacy Policy. We
            will retain and use Your Personal Data to the extent necessary to
            comply with our legal obligations (for example, if we are required
            to retain your data to comply with applicable laws), resolve
            disputes, and enforce our legal agreements and policies.
          </p>
          <p>
            The organization will also retain Usage Data for internal analysis
            purposes. Usage Data is generally retained for a shorter period of
            time, except when this data is used to strengthen the security or to
            improve the functionality of Our Service, or We are legally
            obligated to retain this data for longer time periods.
          </p>
          <Typography variant="h5" fontWeight="bold">
            Transfer of Your Personal Data
          </Typography>
          <p>
            Your information, including Personal Data, is processed at the
            organization&apos;s operating offices and in any other places where
            the parties involved in the processing are located. It means that
            this information may be transferred to — and maintained on —
            computers located outside of Your state, province, country or other
            governmental jurisdiction where the data protection laws may differ
            than those from Your jurisdiction.
          </p>
          <p>
            Your consent to this Privacy Policy followed by Your submission of
            such information represents Your agreement to that transfer.
          </p>
          <p>
            The organization will take all steps reasonably necessary to ensure
            that Your data is treated securely and in accordance with this
            Privacy Policy and no transfer of Your Personal Data will take place
            to an organization or a country unless there are adequate controls
            in place including the security of Your data and other personal
            information.
          </p>
          <Typography variant="h5" fontWeight="bold">
            Delete Your Personal Data
          </Typography>
          <p>
            You have the right to delete or request that We assist in deleting
            the Personal Data that We have collected about You.
          </p>
          <p>
            Our Service may give You the ability to delete certain information
            about You from within the Service.
          </p>
          <p>
            You may update, amend, or delete Your information at any time by
            signing in to Your Account, if you have one, and visiting the
            account settings section that allows you to manage Your personal
            information. You may also contact Us to request access to, correct,
            or delete any personal information that You have provided to Us.
          </p>
          <p>
            Please note, however, that We may need to retain certain information
            when we have a legal obligation or lawful basis to do so.
          </p>
          <Typography variant="h5" fontWeight="bold">
            Disclosure of Your Personal Data
          </Typography>
          <h3>Law enforcement</h3>
          <p>
            Under certain circumstances, the organization may be required to
            disclose Your Personal Data if required to do so by law or in
            response to valid requests by public authorities (e.g. a court or a
            government agency).
          </p>
          <h3>Other legal requirements</h3>
          <p>
            The organization may disclose Your Personal Data in the good faith
            belief that such action is necessary to:
          </p>
          <ul>
            <li>Comply with a legal obligation</li>
            <li>
              Protect and defend the rights or property of the organization
            </li>
            <li>
              Prevent or investigate possible wrongdoing in connection with the
              Service
            </li>
            <li>
              Protect the personal safety of Users of the Service or the public
            </li>
            <li>Protect against legal liability</li>
          </ul>
          <Typography variant="h5" fontWeight="bold">
            Security of Your Personal Data
          </Typography>
          <p>
            The security of Your Personal Data is important to Us, but remember
            that no method of transmission over the Internet, or method of
            electronic storage is 100% secure. While We strive to use
            commercially acceptable means to protect Your Personal Data, We
            cannot guarantee its absolute security.
          </p>
          <Typography variant="h5" fontWeight="bold">
            Children&apos;s Privacy
          </Typography>
          <p>
            Our Service does not address anyone under the age of 18. We do not
            knowingly collect personally identifiable information from anyone
            under the age of 18. If You are a parent or guardian and You are
            aware that Your child has provided Us with Personal Data, please
            contact Us. If We become aware that We have collected Personal Data
            from anyone under the age of 18 without verification of parental
            consent, We take steps to remove that information from Our servers.
          </p>
          <p>
            If We need to rely on consent as a legal basis for processing Your
            information and Your country requires consent from a parent, We may
            require Your parent&apos;s consent before We collect and use that
            information.
          </p>
          <Typography variant="h5" fontWeight="bold">
            Links to Other Websites
          </Typography>

          <p>
            Our Service may contain links to other websites that are not
            operated by Us. If You click on a third party link, You will be
            directed to that third party&apos;s site. We strongly advise You to
            review the Privacy Policy of every site You visit.
          </p>
          <p>
            We have no control over and assume no responsibility for the
            content, privacy policies or practices of any third party sites or
            services.
          </p>
          <Typography variant="h5" fontWeight="bold">
            Changes to this Privacy Policy
          </Typography>
          <p>
            We may update Our Privacy Policy from time to time. We will notify
            You of any changes by posting the new Privacy Policy on this page.
          </p>
          <p>
            We will let You know via email and/or a prominent notice on Our
            Service, prior to the change becoming effective and update the
            &quot;Last updated&quot; date at the top of this Privacy Policy.
          </p>
          <p>
            You are advised to review this Privacy Policy periodically for any
            changes. Changes to this Privacy Policy are effective when they are
            posted on this page.
          </p>
        </Box>

        <Box mt={2}>
          <Typography variant="h5">Contact Us</Typography>
          <Typography variant="subtitle1">
            If you have any queries about this privacy policy, please click{' '}
            <Link href="/contact-us">here to contact us.</Link>
          </Typography>
        </Box>
        <Alert severity="info" sx={{ mt: 2 }}>
          If you find any of the content here is not correct or contradicting to
          one another, please feel free to contact us, we are open and ready to
          accept & make changes.
        </Alert>
      </Paper>
    </Layout>
  );
}
