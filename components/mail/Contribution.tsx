import {
  Body,
  Container,
  Column,
  Head,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Text,
} from '@react-email/components';
import { SITE_URL, TELEGRAM_URL } from 'core/utils/constants';
import * as React from 'react';

interface ContributionsEmailProps {
  email?: string;
  position?: string;
  resume?: string;
  comment?: string;
  telegram?: string;
  wallet?: string;
  updatedDate?: Date;
}

export const ContributionsMail = ({
  email,
  position,
  resume,
  comment,
  telegram,
  wallet,
  updatedDate = new Date(),
}: ContributionsEmailProps) => {
  const formattedDate = new Intl.DateTimeFormat('en', {
    dateStyle: 'medium',
    timeStyle: 'medium',
  }).format(updatedDate);

  return (
    <Html>
      <Head />
      <Preview>We have received your application for the {String(position)} at Venom ID</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={logo}>
            <Img width={114} src={`${SITE_URL}/logos/vidicon.png`} />
          </Section>
          <Section style={sectionsBorders}>
            <Row>
              <Column style={sectionBorder} />
              <Column style={sectionCenter} />
              <Column style={sectionBorder} />
            </Row>
          </Section>
          <Section style={content}>
            <Text style={paragraph}>
              Hi 👋
            </Text>
            <Text style={paragraph}>
              We have received your application for the <strong>{position}</strong> at{' '}
              <strong>Venom ID</strong> on <strong>{formattedDate}</strong>.
              <br /> Thank you for considering contribution to Venom ID.
              <br />
              we will get in touch with you soon.
            </Text>
            <Text></Text>
            <br />
            <br />
            <Text style={paragraph}>Your Information</Text>
            <Text style={paragraph}>
              Email : <strong>{email}</strong>
            </Text>
            {resume && (
              <Text style={paragraph}>
                Resume :{' '}
                <strong>
                  <Link href={resume} style={link}>
                    {' '}
                    pdf
                  </Link>
                </strong>
              </Text>
            )}
            {telegram && (
              <Text style={paragraph}>
                Telegram : <strong>{telegram}</strong>
              </Text>
            )}
            {comment && (
              <Text style={paragraph}>
                Note : <strong>{comment}</strong>
              </Text>
            )}
            {wallet && (
              <Text style={paragraph}>
                Address : <strong>{wallet}</strong>
              </Text>
            )}
            <br />
            <br />
            <Text style={paragraph}>
              Have questions? Please contact{' '}
              <Link href={TELEGRAM_URL} style={link}>
                Venom ID Support
              </Link>
            </Text>
            <Text style={paragraph}>
              Thanks,
              <br />
              Venom ID Support Team
            </Text>
          </Section>
        </Container>

        <Section style={footer}>
          <Row>
            <Column align="right" style={{ width: '50%', paddingRight: '8px' }}>
              <Link href="https://twitter.com/Venomid_network" style={link}>
                Follow us on twitter
              </Link>
            </Column>
            <Column align="left" style={{ width: '50%', paddingLeft: '8px' }}>
              <Link href={TELEGRAM_URL} style={link}>
                Message us on telegram
              </Link>
            </Column>
          </Row>
          <Text style={{ textAlign: 'center', color: '#706a7b' }}>
            © 2023 Venom ID, All Rights Reserved
          </Text>
        </Section>
      </Body>
    </Html>
  );
};

export default ContributionsMail;

const fontFamily = 'HelveticaNeue,Helvetica,Arial,sans-serif';

const main = {
  backgroundColor: '#d9dee1',
  fontFamily,
};

const paragraph = {
  lineHeight: 1.5,
  fontSize: 14,
};

const container = {
  width: '580px',
  margin: '30px auto',
  backgroundColor: '#ffffff',
};

const footer = {
  width: '580px',
  margin: '0 auto',
};

const content = {
  padding: '5px 50px 10px 60px',
};

const logo = {
  display: 'flex',
  justifyContent: 'center',
  alingItems: 'center',
  padding: 30,
};

const sectionsBorders = {
  width: '100%',
  display: 'flex',
};

const sectionBorder = {
  borderBottom: '1px solid #3aa16e',
  width: '249px',
};

const sectionCenter = {
  borderBottom: '1px solid #3aa16e',
  width: '102px',
};

const link = {
  textDecoration: 'underline',
};
