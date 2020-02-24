export default {
    url: 'http://uat-tws.thailife.com:8080/ldapservice/tldap',
    sampleHeaders: {
        'Content-Type': 'text/xml;charset=UTF-8',
        SOAPAction: 'http://uat-tws.thailife.com:8080/ldapservice/tldap?wsdl',
    },
    ldap: `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:web="http://webservice.ldapadmin/">
    <soapenv:Header/>
    <soapenv:Body>
    <web:serviceReq>
    <!--Optional:-->
    <arg0>
    <requestID>auth</requestID>
    <TLdapSecurity>
    <password>#passwordparam#</password>
    <username>#userparam#</username>
    </TLdapSecurity>
    </arg0>
    </web:serviceReq>
    </soapenv:Body>
    </soapenv:Envelope>`,

}