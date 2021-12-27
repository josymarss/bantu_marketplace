import { jsPDF } from 'jspdf';

// Default export is a4 paper, portrait, using millimeters for units
function generatePDF(appname,usersolicitante,titulo,description,userproprietario ){
      const doc = new jsPDF();

      doc.text(`A bantu-marketplace tem o prazer de informar que todos os dados do aplicativo
      ${appname} seguem todos os par]ametros da lei de acordo com os termos de uso da bantu, na seção
      de informação, tendo como requerente${usersolicitante} para o aplicativo do ${userproprietario}
      como o título de ${titulo} com a seguinte descrição: ${description}, lembrando que, essa negociação deve ser cumprida
      na data prevista, pois a bantu em coperação com a AGT asegura que em caso de incumprimento,
      a lei do consumidor e os direitos da lei serão aplicados.`, 10, 10);

      doc.save(`${appname}.pdf`);
}

export default generatePDF;
